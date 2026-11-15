(() => {
  "use strict";

  const app = document.getElementById("app");
  const intro = document.getElementById("screen-intro");
  const book = document.getElementById("screen-book");
  const folder = document.getElementById("folder");
  const replyEl = document.getElementById("reply");
  const yesBtn = document.getElementById("choice-yes");
  const noBtn = document.getElementById("choice-no");
  const restartBtn = document.getElementById("restart");
  const bookMain = document.getElementById("book-main");
  const navItems = Array.from(document.querySelectorAll(".archive__nav-item"));
  const pages = Array.from(document.querySelectorAll(".page"));
  const veil = document.getElementById("veil");
  const musicBtn = document.getElementById("music-btn");
  const bgm = document.getElementById("bgm");

  let transitioning = false;
  let resetting = false;

  /* ---------- music ---------- */

  let userPaused = false;
  bgm.volume = 0.5;

  function syncMusic() {
    const playing = !bgm.paused && !bgm.ended;
    musicBtn.classList.toggle("is-playing", playing);
    musicBtn.setAttribute("aria-pressed", String(playing));
    musicBtn.setAttribute(
      "aria-label",
      playing ? "暂停《我怀念的》- 孙燕姿" : "播放《我怀念的》- 孙燕姿"
    );
  }

  async function playMusic() {
    try {
      await bgm.play();
      return true;
    } catch {
      return false;
    }
  }

  function armGestureUnlock() {
    const events = ["pointerdown", "touchstart", "keydown"];
    const unlock = async (event) => {
      const target = event.target;
      if (target instanceof Element && target.closest("#music-btn")) return;
      if (userPaused || !bgm.paused) {
        cleanup();
        return;
      }
      if (await playMusic()) cleanup();
    };
    const cleanup = () => {
      events.forEach((name) => document.removeEventListener(name, unlock, true));
    };
    events.forEach((name) => document.addEventListener(name, unlock, true));
  }

  musicBtn.addEventListener("click", async () => {
    if (bgm.paused) {
      userPaused = false;
      await playMusic();
    } else {
      userPaused = true;
      bgm.pause();
    }
  });

  bgm.addEventListener("play", syncMusic);
  bgm.addEventListener("pause", syncMusic);

  (async () => {
    if (!(await playMusic())) armGestureUnlock();
  })();

  /* ---------- screens ---------- */

  function showScreen(name) {
    const onBook = name === "book";
    intro.classList.toggle("is-active", !onBook);
    book.classList.toggle("is-active", onBook);
    app.dataset.screen = name;
  }

  function setPage(name) {
    navItems.forEach((item) => {
      item.classList.toggle("is-active", item.dataset.target === name);
    });
    pages.forEach((page) => {
      page.classList.toggle("is-active", page.dataset.page === name);
    });
    bookMain.scrollTop = 0;
  }

  /* ---------- intro ---------- */

  function clearReply() {
    replyEl.textContent = "";
    replyEl.classList.remove("is-on");
  }

  function openArchive() {
    folder.classList.remove("is-in", "is-open", "is-asked");
    clearReply();
    yesBtn.disabled = false;
    noBtn.disabled = false;
    folder.offsetWidth;

    window.setTimeout(() => folder.classList.add("is-in"), 220);
    window.setTimeout(() => folder.classList.add("is-open"), 620);
    window.setTimeout(() => folder.classList.add("is-asked"), 1550);
  }

  function enterBook() {
    transitioning = true;
    veil.classList.add("is-on");
    window.setTimeout(() => {
      setPage("meet");
      showScreen("book");
      bookMain.scrollTop = 0;
    }, 520);
    window.setTimeout(() => {
      veil.classList.remove("is-on");
      transitioning = false;
    }, 1150);
  }

  yesBtn.addEventListener("click", () => {
    if (transitioning) return;
    yesBtn.disabled = true;
    noBtn.disabled = true;
    replyEl.textContent = "我等你很久了";
    replyEl.classList.add("is-on");
    window.setTimeout(enterBook, 1450);
  });

  noBtn.addEventListener("click", () => {
    if (transitioning) return;
    replyEl.textContent = "不着急档案一直在这里等待你的开启";
    replyEl.classList.add("is-on");
  });

  restartBtn.addEventListener("click", () => {
    if (resetting) return;
    resetting = true;
    transitioning = false;
    setPage("meet");
    showScreen("intro");
    window.setTimeout(() => {
      openArchive();
      resetting = false;
    }, 280);
  });

  navItems.forEach((item) => {
    item.addEventListener("click", () => setPage(item.dataset.target));
  });

  // First entrance.
  window.setTimeout(openArchive, 420);
})();
