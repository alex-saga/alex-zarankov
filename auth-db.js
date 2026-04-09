const AUTH_DB_NAME = "fitnesslab_auth_db";
const AUTH_DB_VERSION = 1;
const USERS_STORE = "users";

function openAuthDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(AUTH_DB_NAME, AUTH_DB_VERSION);

    request.onupgradeneeded = event => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(USERS_STORE)) {
        const store = db.createObjectStore(USERS_STORE, { keyPath: "email" });
        store.createIndex("email", "email", { unique: true });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

async function createUser({ name, email, password }) {
  const db = await openAuthDatabase();
  const normalizedEmail = normalizeEmail(email);

  return new Promise((resolve, reject) => {
    const tx = db.transaction(USERS_STORE, "readwrite");
    const store = tx.objectStore(USERS_STORE);

    const user = {
      name: String(name || "").trim(),
      email: normalizedEmail,
      password: String(password || "")
    };

    const req = store.add(user);
    req.onsuccess = () => resolve(user);
    req.onerror = () => {
      if (req.error && req.error.name === "ConstraintError") {
        reject(new Error("Потребител с този имейл вече съществува."));
        return;
      }
      reject(req.error || new Error("Грешка при създаване на потребител."));
    };
  });
}

async function getUserByEmail(email) {
  const db = await openAuthDatabase();
  const normalizedEmail = normalizeEmail(email);

  return new Promise((resolve, reject) => {
    const tx = db.transaction(USERS_STORE, "readonly");
    const store = tx.objectStore(USERS_STORE);
    const req = store.get(normalizedEmail);

    req.onsuccess = () => resolve(req.result || null);
    req.onerror = () => reject(req.error || new Error("Грешка при търсене на потребител."));
  });
}

async function validateUser(email, password) {
  const user = await getUserByEmail(email);
  if (!user) {
    return { ok: false, reason: "no_user" };
  }
  if (user.password !== String(password || "")) {
    return { ok: false, reason: "wrong_password" };
  }
  return { ok: true, user };
}
