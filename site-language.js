(function () {
  const STORAGE_KEY = "fitnesslab_lang";
  const ICON_SRC = "https://cdn-icons-png.flaticon.com/512/1077/1077114.png";
  const EN_TEXT = {
    "Сила, здраве и увереност всеки ден": "Strength, health and confidence every day",
    "Базови упражнения": "Basic Exercises",
    "Клек": "Squat",
    "Лежанка": "Bench Press",
    "Мъртва тяга": "Deadlift",
    "Здравословно хапване": "Healthy Eating",
    "Контузии / Болежки": "Injuries / Pain",
    "Изчисли подкожни мазнини": "Calculate Body Fat",
    "Дневният ми енергоразход": "My Daily Calories",
    "Дневен енергоразход": "Daily Calories",
    "Ревюта": "Reviews",
    "Вход": "Log In",
    "Изход": "Log Out",
    "Изгради по-силна версия на себе си": "Build a stronger version of yourself",
    "Тренировки, възстановяване и хранене в една система. Избери ниво и започни прогреса си още днес.": "Training, recovery and nutrition in one system. Choose a level and start your progress today.",
    "Колко процента подкожни мазнини съм": "What is my body fat percentage",
    "3 Нива": "3 Levels",
    "Ясен път: Начинаещ → Средно → Напреднал": "Clear path: Beginner -> Intermediate -> Advanced",
    "Практични насоки за реална зала": "Practical guidance for real gym training",
    "7 Дни": "7 Days",
    "Хранителни и тренировъчни идеи за седмицата": "Meal and training ideas for the week",
    "1 Цел": "1 Goal",
    "Постоянен прогрес без хаос": "Consistent progress without chaos",
    "Старт": "Start",
    "Прогрес": "Progress",
    "Начинаещ": "Beginner",
    "Средно напреднал": "Intermediate",
    "Напреднал": "Advanced",
    "Мъртва тяга — Силата от земята": "Deadlift — Power from the ground",
    "Клек — короната на силата": "Squat — the crown of strength",
    "Бенч Прес — Кралят на гърдите": "Bench Press — the king of the chest",
    "Видео демонстрация": "Video demonstration",
    "Контузии и болежки — тренирай умно, не само силно": "Injuries and pain — train smart, not only hard",
    "Как да избегнем контузии?": "How to avoid injuries?",
    "Какво да правим, ако нещо боли?": "What to do if something hurts?",
    "Най-честите фитнес контузии": "Most common gym injuries",
    "Полезни видеа за болки и възстановяване": "Useful videos for pain and recovery",
    "Слушай тялото си": "Listen to your body",
    "Какво конкретно да присъства в менюто ти": "What should be in your menu",
    "Протеини (във всяко хранене)": "Protein (in every meal)",
    "Бавни въглехидрати": "Slow carbohydrates",
    "Полезни мазнини": "Healthy fats",
    "Зеленчуци и плодове всеки ден": "Vegetables and fruits every day",
    "Практична формула за всяко основно хранене": "Practical formula for each main meal",
    "Примерен супер чист ден (ако искаш бърз старт)": "Sample super clean day (if you want a quick start)",
    "Понеделник–Неделя: конкретна програма": "Monday-Sunday: specific plan",
    "Златно правило": "Golden rule",
    "© FitnessLab 2025 — Влез, избери ниво и започни промяната.": "© FitnessLab 2025 — Log in, choose a level and start your transformation.",
    "© FitnessLab 2025 — Расти умно и силно.": "© FitnessLab 2025 — Grow smart and strong.",
    "© FitnessLab 2025 — Възстанови се, учи се, върви напред.": "© FitnessLab 2025 — Recover, learn and keep moving.",
    "© FitnessLab 2025 — Храни се умно, живей силно.": "© FitnessLab 2025 — Eat smart, live strong.",
    "© FitnessLab 2025 — Дръпни. Изправи се. Покори.": "© FitnessLab 2025 — Pull. Stand. Conquer.",
    "Отзиви от нашите потребители": "Reviews from our users",
    "Общо ревюта:": "Total reviews:",
    "Добави ревю": "Add review",
    "Вашето име": "Your name",
    "Вашето мнение...": "Your review...",
    "Публикувай": "Publish",
    "Благодарим за доверието!": "Thank you for your trust!",
    "Попълнете всички полета!": "Please fill in all fields!",
    "Активен трениращ": "Active trainee",
    "Снимка на трениращ": "Trainee photo",
    "Регистрация": "Sign Up",
    "Пълно име": "Full name",
    "Име и фамилия": "First and last name",
    "Имейл": "Email",
    "Парола": "Password",
    "Потвърдете паролата": "Confirm password",
    "Създай акаунт": "Create account",
    "Вече имате акаунт? Вход": "Already have an account? Log in",
    "Паролите не съвпадат.": "Passwords do not match."
  };
  const EN_KEYS = Object.keys(EN_TEXT).sort((a, b) => b.length - a.length);
  const CACHE_KEY = "fitnesslab_translate_cache_bg_en_v1";
  const LOGGED_OUT_ALLOWED_PAGES = new Set(["index.html", "ratings.html", "log-in.html", "sign-up.html"]);
  const LOGIN_PAGE = "log-in.html";
  const ACCOUNT_SETTINGS_PAGE = "account-settings.html";
  const FALLBACK_PUBLIC_PAGE = "index.html";
  let translateCache = {};
  try {
    translateCache = JSON.parse(localStorage.getItem(CACHE_KEY) || "{}");
  } catch (_e) {
    translateCache = {};
  }

  function injectStyles() {
    if (document.getElementById("site-lang-style")) return;
    const style = document.createElement("style");
    style.id = "site-lang-style";
    style.textContent = `
      .profile-icon-link {
        display: inline-flex !important;
        align-items: center;
        justify-content: center;
        width: 46px;
        height: 46px;
        padding: 0 !important;
      }
      .profile-icon-link img {
        width: 24px;
        height: 24px;
        filter: brightness(0) invert(1);
        object-fit: contain;
      }
      .lang-flags-wrap {
        display: inline-flex;
        align-items: center;
        gap: 8px;
      }
      .header-user-greeting {
        display: inline-flex;
        align-items: center;
        color: #e0e5ff;
        font-weight: 700;
        font-size: 14px;
        white-space: nowrap;
      }
      .leave-account-btn {
        border: 1px solid rgba(255,255,255,0.18);
        background: rgba(255,255,255,0.08);
        color: #f4f6ff;
        border-radius: 999px;
        padding: 6px 10px;
        font-size: 12px;
        font-weight: 700;
        line-height: 1;
        cursor: pointer;
        transition: transform 0.2s ease, background 0.2s ease;
      }
      .leave-account-btn:hover {
        transform: translateY(-1px);
        background: rgba(255,255,255,0.16);
      }
      .lang-flag {
        width: 34px;
        height: 24px;
        border-radius: 2px;
        border: 1px solid rgba(255,255,255,0.25);
        box-shadow: 0 2px 6px rgba(0,0,0,0.45);
        cursor: pointer;
        transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
        opacity: 0.85;
      }
      .lang-flag:hover {
        transform: translateY(-1px) scale(1.05);
        opacity: 1;
      }
      .lang-flag.active {
        outline: 2px solid rgba(255,255,255,0.9);
        opacity: 1;
      }
      .auth-gate-modal {
        position: fixed;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(5, 8, 18, 0.72);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        z-index: 99999;
      }
      .auth-gate-card {
        width: min(92vw, 420px);
        padding: 24px;
        border-radius: 16px;
        border: 1px solid rgba(255,255,255,0.16);
        background: linear-gradient(165deg, rgba(17, 22, 39, 0.98), rgba(20, 28, 58, 0.96));
        box-shadow: 0 16px 40px rgba(0,0,0,0.55);
        color: #f0f3ff;
        text-align: center;
      }
      .auth-gate-title {
        margin: 0 0 8px;
        font-size: 24px;
        font-weight: 800;
      }
      .auth-gate-text {
        margin: 0 0 18px;
        line-height: 1.5;
        color: #d0d8ff;
      }
      .auth-gate-actions {
        display: flex;
        gap: 10px;
        justify-content: center;
      }
      .auth-gate-btn {
        border: 0;
        border-radius: 12px;
        padding: 10px 16px;
        font-weight: 700;
        cursor: pointer;
        transition: transform 0.2s ease, opacity 0.2s ease;
      }
      .auth-gate-btn:hover {
        transform: translateY(-1px);
      }
      .auth-gate-btn-primary {
        background: linear-gradient(145deg, #ffd65a, #ffbc2c);
        color: #111;
      }
      .auth-gate-btn-secondary {
        background: rgba(255,255,255,0.12);
        color: #eff2ff;
      }
    `;
    document.head.appendChild(style);
  }

  function markActiveFlag(lang) {
    document.querySelectorAll(".lang-flag").forEach((flag) => {
      flag.classList.toggle("active", flag.dataset.lang === lang);
    });
  }

  function buildHeaderControls() {
    const actions = document.querySelector(".top-actions");
    if (!actions) return;
    const isEnglish = localStorage.getItem(STORAGE_KEY) === "en";
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const userName = (localStorage.getItem("userName") || "").trim();

    const loginLink = actions.querySelector('a[href="log-in.html"]');
    if (loginLink) {
      loginLink.classList.add("profile-icon-link");
      loginLink.innerHTML = '<img src="' + ICON_SRC + '" alt="Profile">';
      loginLink.setAttribute("aria-label", isEnglish ? "Your Account" : "Твоят акаунт");
      loginLink.title = isEnglish ? "Your Account" : "Твоят акаунт";
      loginLink.setAttribute("href", isLoggedIn ? ACCOUNT_SETTINGS_PAGE : LOGIN_PAGE);
    }

    const existingGreeting = actions.querySelector(".header-user-greeting");
    if (isLoggedIn && userName) {
      if (!existingGreeting && loginLink) {
        const greeting = document.createElement("span");
        greeting.className = "header-user-greeting";
        greeting.textContent = userName;
        loginLink.insertAdjacentElement("afterend", greeting);
      } else if (existingGreeting) {
        existingGreeting.textContent = userName;
      }
    } else if (existingGreeting) {
      existingGreeting.remove();
    }

    let flags = actions.querySelector(".lang-flags-wrap");
    if (!flags) {
      flags = document.createElement("div");
      flags.className = "lang-flags-wrap";
      flags.innerHTML = `
        <img class="lang-flag" data-lang="bg" src="https://flagcdn.com/w40/bg.png" alt="Bulgarian">
        <img class="lang-flag" data-lang="en" src="https://flagcdn.com/w40/gb.png" alt="English">
      `;
      actions.appendChild(flags);
    }

    const existingLeaveBtn = actions.querySelector(".leave-account-btn");
    if (isLoggedIn) {
      if (!existingLeaveBtn) {
        const leaveBtn = document.createElement("button");
        leaveBtn.type = "button";
        leaveBtn.className = "leave-account-btn";
        leaveBtn.textContent = isEnglish ? "• Leave" : "• Изход";
        leaveBtn.addEventListener("click", function () {
          localStorage.removeItem("isLoggedIn");
          localStorage.removeItem("userName");
          alert(isEnglish ? "You have logged out successfully!" : "Излезе успешно!");
          location.href = FALLBACK_PUBLIC_PAGE;
        });
        actions.appendChild(leaveBtn);
      } else {
        existingLeaveBtn.textContent = isEnglish ? "• Leave" : "• Изход";
      }
      if (flags && flags.nextElementSibling !== actions.querySelector(".leave-account-btn")) {
        actions.appendChild(actions.querySelector(".leave-account-btn"));
      }
    } else if (existingLeaveBtn) {
      existingLeaveBtn.remove();
    }
  }

  function translateString(value) {
    if (!value) return value;
    let out = value;
    EN_KEYS.forEach((bg) => {
      if (out.includes(bg)) out = out.split(bg).join(EN_TEXT[bg]);
    });
    return out;
  }

  function hasCyrillic(value) {
    return /[А-Яа-яЁё]/.test(value || "");
  }

  async function translateTextApi(bgText) {
    const key = (bgText || "").trim();
    if (!key) return bgText;
    if (translateCache[key]) return translateCache[key];
    try {
      const url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=bg&tl=en&dt=t&q=" + encodeURIComponent(key);
      const response = await fetch(url);
      if (!response.ok) return bgText;
      const data = await response.json();
      const parts = Array.isArray(data && data[0]) ? data[0] : [];
      const translated = parts.map((p) => (Array.isArray(p) ? p[0] : "")).join("").trim();
      if (!translated) return bgText;
      translateCache[key] = translated;
      localStorage.setItem(CACHE_KEY, JSON.stringify(translateCache));
      return translated;
    } catch (_e) {
      return bgText;
    }
  }

  function translateNodeText() {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
    const nodes = [];
    let node;
    while ((node = walker.nextNode())) {
      if (!node.nodeValue || !node.nodeValue.trim()) continue;
      const parentTag = node.parentElement ? node.parentElement.tagName : "";
      if (parentTag === "SCRIPT" || parentTag === "STYLE" || parentTag === "NOSCRIPT") continue;
      nodes.push(node);
    }

    nodes.forEach((textNode) => {
      const raw = textNode.nodeValue;
      const translated = translateString(raw);
      if (translated !== raw) textNode.nodeValue = translated;
    });
  }

  async function translateUnknownNodesApi() {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
    const pending = [];
    let node;
    while ((node = walker.nextNode())) {
      const raw = node.nodeValue;
      if (!raw || !raw.trim()) continue;
      const parentTag = node.parentElement ? node.parentElement.tagName : "";
      if (parentTag === "SCRIPT" || parentTag === "STYLE" || parentTag === "NOSCRIPT") continue;
      const trimmed = raw.trim();
      if (!hasCyrillic(trimmed)) continue;
      pending.push({ node, raw, trimmed });
    }

    for (const item of pending) {
      const translated = await translateTextApi(item.trimmed);
      if (translated && translated !== item.trimmed) {
        item.node.nodeValue = item.raw.replace(item.trimmed, translated);
      }
    }
  }

  async function translateUnknownAttrsApi() {
    const attrs = [];
    document.querySelectorAll("[placeholder],[alt],[title]").forEach((el) => {
      ["placeholder", "alt", "title"].forEach((attr) => {
        const val = el.getAttribute(attr);
        if (val && hasCyrillic(val)) attrs.push({ el, attr, val });
      });
    });
    for (const item of attrs) {
      const translated = await translateTextApi(item.val);
      if (translated && translated !== item.val) item.el.setAttribute(item.attr, translated);
    }
  }

  function translateAttributes() {
    document.querySelectorAll("[placeholder],[alt],[title]").forEach((el) => {
      ["placeholder", "alt", "title"].forEach((attr) => {
        const val = el.getAttribute(attr);
        if (!val) return;
        const translated = translateString(val);
        if (translated !== val) el.setAttribute(attr, translated);
      });
    });
  }

  function translateTitle() {
    document.title = translateString(document.title);
  }

  function installAlertTranslator() {
    if (window.__fitLangAlertInstalled) return;
    window.__fitLangAlertInstalled = true;
    const originalAlert = window.alert;
    window.alert = function (message) {
      if (localStorage.getItem(STORAGE_KEY) === "en" && typeof message === "string") {
        return originalAlert(translateString(message));
      }
      return originalAlert(message);
    };
  }

  function installMutationTranslator() {
    const observer = new MutationObserver(function () {
      if (localStorage.getItem(STORAGE_KEY) !== "en") return;
      translateNodeText();
      translateAttributes();
      translateTitle();
    });
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  }

  function getCurrentPageName() {
    const path = location.pathname.split("/").pop() || "";
    return path.toLowerCase() || "index.html";
  }

  function isProtectedPage(pageName) {
    return !LOGGED_OUT_ALLOWED_PAGES.has((pageName || "").toLowerCase());
  }

  function showAuthGateModal(targetPage) {
    if (document.getElementById("auth-gate-modal")) return;
    const isEnglish = localStorage.getItem(STORAGE_KEY) === "en";
    const copy = isEnglish
      ? {
          title: "Please log in first",
          text: "This page is locked. Log in to your account to continue.",
          login: "Log In",
          home: "Go to Home Page"
        }
      : {
          title: "Първо влез в акаунта си",
          text: "Тази страница е заключена. Влез в профила си, за да продължиш.",
          login: "Вход",
          home: "Към началната страница"
        };

    const modal = document.createElement("div");
    modal.id = "auth-gate-modal";
    modal.className = "auth-gate-modal";
    modal.innerHTML = `
      <div class="auth-gate-card" role="dialog" aria-modal="true" aria-labelledby="auth-gate-title">
        <h2 id="auth-gate-title" class="auth-gate-title">${copy.title}</h2>
        <p class="auth-gate-text">${copy.text}</p>
        <div class="auth-gate-actions">
          <button type="button" class="auth-gate-btn auth-gate-btn-primary" data-action="login">${copy.login}</button>
          <button type="button" class="auth-gate-btn auth-gate-btn-secondary" data-action="home">${copy.home}</button>
        </div>
      </div>
    `;

    modal.addEventListener("click", function (event) {
      const button = event.target.closest("[data-action]");
      if (!button) return;
      const action = button.getAttribute("data-action");
      if (action === "login") {
        const redirect = targetPage && targetPage !== LOGIN_PAGE ? "?redirect=" + encodeURIComponent(targetPage) : "";
        location.href = LOGIN_PAGE + redirect;
        return;
      }
      if (action === "home") {
        location.href = FALLBACK_PUBLIC_PAGE;
      }
    });

    document.body.appendChild(modal);
    document.body.style.overflow = "hidden";
  }

  function installAuthGate() {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn) return;

    const currentPage = getCurrentPageName();
    if (isProtectedPage(currentPage)) {
      showAuthGateModal(currentPage);
    }

    document.addEventListener("click", function (event) {
      const anchor = event.target.closest("a[href]");
      if (!anchor) return;
      const rawHref = anchor.getAttribute("href");
      if (!rawHref || rawHref.startsWith("#") || rawHref.startsWith("javascript:")) return;

      let url;
      try {
        url = new URL(rawHref, location.href);
      } catch (_e) {
        return;
      }
      if (url.origin !== location.origin) return;

      const targetPage = (url.pathname.split("/").pop() || "").toLowerCase();
      if (!targetPage || !isProtectedPage(targetPage)) return;

      event.preventDefault();
      showAuthGateModal(targetPage);
    }, true);
  }

  async function applyLanguage(lang) {
    const target = lang === "en" ? "en" : "bg";
    localStorage.setItem(STORAGE_KEY, target);
    markActiveFlag(target);

    if (target === "bg") {
      location.reload();
      return;
    }

    document.documentElement.lang = "en";
    translateTitle();
    translateNodeText();
    translateAttributes();
    await translateUnknownNodesApi();
    await translateUnknownAttrsApi();
  }

  injectStyles();
  buildHeaderControls();
  installAuthGate();
  installAlertTranslator();
  installMutationTranslator();

  const saved = localStorage.getItem(STORAGE_KEY) || "bg";
  markActiveFlag(saved);

  document.querySelectorAll(".lang-flag").forEach((flag) => {
    flag.addEventListener("click", function () {
      applyLanguage(flag.dataset.lang);
    });
  });

  if (saved === "en") applyLanguage("en");
})();
