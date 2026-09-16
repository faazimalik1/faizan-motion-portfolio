(() => {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia(
    "(hover: hover) and (pointer: fine)",
  ).matches;
  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => [
    ...parent.querySelectorAll(selector),
  ];

  document.body.classList.add("loaded");

  const header = $(".site-header");
  const hero = $(".hero");
  const heroInner = $(".hero-inner");
  const heroFirst = $(".hero-name-first");
  const heroLast = $(".hero-name-last");
  const atmosphere = $(".hero-atmosphere");
  const showreel = $(".showreel");
  const timeline = $(".timeline");
  const skills = $$(".skill");
  const sectionHeads = $$(".section-head, .contact-intro");
  const progress = $(".scroll-progress");
  const backToTop = $(".back-to-top");
  let lastY = window.scrollY;
  let scrollQueued = false;

  const clamp = (value, min = 0, max = 1) =>
    Math.max(min, Math.min(max, value));

  const buildTicker = () => {
    const track = $(".ticker-track");
    const source = $("[data-ticker-group]", track || document);
    if (!track || !source) return;

    $$('[data-ticker-clone="true"]', track).forEach((clone) => clone.remove());
    const sourceWidth = Math.ceil(source.getBoundingClientRect().width);
    if (!sourceWidth) return;

    const requiredWidth = window.innerWidth + sourceWidth * 2;
    while (track.scrollWidth < requiredWidth || track.children.length < 4) {
      const clone = source.cloneNode(true);
      clone.removeAttribute("data-ticker-group");
      clone.dataset.tickerClone = "true";
      clone.setAttribute("aria-hidden", "true");
      track.appendChild(clone);
    }

    track.style.setProperty("--ticker-distance", `${sourceWidth}px`);
    track.style.setProperty(
      "--ticker-duration",
      `${Math.max(24, sourceWidth / 58).toFixed(2)}s`,
    );
  };

  buildTicker();
  document.fonts?.ready.then(buildTicker);
  let resizeTimer;
  addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      buildTicker();
      updateScrollEffects();
    }, 140);
  });

  const updateScrollEffects = () => {
    scrollQueued = false;
    const y = window.scrollY;
    const delta = y - lastY;
    if (Math.abs(delta) > 2) {
      document.body.classList.toggle("scrolling-down", delta > 0);
      document.body.classList.toggle("scrolling-up", delta < 0);
      lastY = y;
    }

    header?.classList.toggle("scrolled", y > 20);
    backToTop?.classList.toggle("visible", y > window.innerHeight * 0.75);
    const scrollable = document.documentElement.scrollHeight - innerHeight;
    progress?.style.setProperty(
      "--scroll-progress",
      `${scrollable > 0 ? (y / scrollable) * 100 : 0}%`,
    );

    if (!reduced && hero && heroInner) {
      const vh = window.innerHeight;
      const p = clamp(y / (vh * 0.92));
      const heroX =
        ((window.innerWidth <= 700 ? -5 : -12) * p * window.innerWidth) / 100;
      heroInner.style.transform = `translate3d(${heroX}px,${(-p * 8 * vh) / 100}px,0) scale(${1 - p * 0.075})`;
      heroInner.style.opacity = String(1 - Math.pow(p, 2) * 0.68);
      atmosphere.style.transform = `translate3d(${p * 3}vw,${p * 4}vh,0) scale(${1 + p * 0.05})`;
      heroFirst.style.transform = `translate3d(${-p * 2.5}vw,0,0) rotate(${-p * 1.2}deg)`;
      heroLast.style.transform = `translate3d(${p * 3.5}vw,0,0) rotate(${p * 1.2}deg)`;
    }

    if (!reduced && showreel) {
      const rect = showreel.getBoundingClientRect();
      const centered = clamp(
        1 -
          Math.abs(
            (rect.top + rect.height / 2 - innerHeight / 2) / innerHeight,
          ),
      );
      showreel.style.transform = `scale(${0.955 + centered * 0.045}) rotateX(${(1 - centered) * 1.2}deg)`;
      showreel.style.setProperty("--show-x", `${48 + centered * 18}%`);
    }

    if (timeline) {
      const rect = timeline.getBoundingClientRect();
      const timelineProgress = clamp(
        ((innerHeight * 0.72 - rect.top) / (rect.height || 1)) * 100,
        0,
        100,
      );
      timeline.style.setProperty("--progress", `${timelineProgress}%`);
    }

    if (!reduced) {
      let strongestSkill = null;
      let strongestFocus = -1;
      skills.forEach((skill, index) => {
        const rect = skill.getBoundingClientRect();
        const phase = clamp(
          (rect.top + rect.height / 2 - innerHeight / 2) / (innerHeight * 0.58),
          -1,
          1,
        );
        const focus = clamp(1 - Math.abs(phase));
        const direction = index % 2 === 0 ? -1 : 1;
        skill.style.setProperty("--skill-shift", `${phase * direction * 28}px`);
        skill.style.setProperty("--skill-lift", `${phase * -18}px`);
        skill.style.setProperty("--skill-tilt", `${phase * direction * 5}deg`);
        skill.style.setProperty("--skill-scale", `${0.94 + focus * 0.06}`);
        skill.style.setProperty("--skill-opacity", `${0.48 + focus * 0.52}`);
        skill.style.setProperty("--skill-focus", focus.toFixed(3));
        if (focus > strongestFocus) {
          strongestFocus = focus;
          strongestSkill = skill;
        }
      });
      skills.forEach((skill) =>
        skill.classList.toggle(
          "active",
          skill === strongestSkill && strongestFocus > 0.25,
        ),
      );

      sectionHeads.forEach((heading) => {
        const rect = heading.getBoundingClientRect();
        const phase = clamp(
          (rect.top + rect.height / 2 - innerHeight / 2) / innerHeight,
          -1,
          1,
        );
        heading.style.setProperty("--section-shift", `${phase * -18}px`);
      });
    }
  };

  addEventListener(
    "scroll",
    () => {
      if (!scrollQueued) {
        scrollQueued = true;
        requestAnimationFrame(updateScrollEffects);
      }
    },
    { passive: true },
  );

  const menu = $(".menu-toggle");
  const mobileNav = $(".mobile-nav");
  menu?.addEventListener("click", () => {
    const open = mobileNav.classList.toggle("open");
    menu.setAttribute("aria-expanded", String(open));
  });
  $$(".mobile-nav a").forEach((link) =>
    link.addEventListener("click", () => {
      mobileNav.classList.remove("open");
      menu?.setAttribute("aria-expanded", "false");
    }),
  );

  const revealObserver = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        const above = entry.boundingClientRect.bottom < innerHeight * 0.08;
        entry.target.classList.toggle("visible", entry.isIntersecting);
        entry.target.classList.toggle(
          "from-above",
          !entry.isIntersecting && above,
        );
        entry.target.classList.toggle(
          "from-below",
          !entry.isIntersecting && !above,
        );
      }),
    { threshold: 0.12, rootMargin: "-5% 0px -5% 0px" },
  );
  $$(".reveal").forEach((element) => revealObserver.observe(element));

  const sections = $$("main section[id]");
  const navLinks = $$(".desktop-nav a");
  const navObserver = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) =>
            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${entry.target.id}`,
            ),
          );
        }
      }),
    { rootMargin: "-45% 0px -45% 0px" },
  );
  sections.forEach((section) => navObserver.observe(section));

  const filterButtons = $$(".filters button");
  const projects = $$(".project");
  filterButtons.forEach((button) =>
    button.addEventListener("click", () => {
      filterButtons.forEach((item) =>
        item.classList.toggle("active", item === button),
      );
      const filter = button.dataset.filter;
      projects.forEach((card) =>
        card.classList.toggle(
          "hidden",
          filter !== "all" && card.dataset.category !== filter,
        ),
      );
    }),
  );

  const itemObserver = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          $$(".timeline-item").forEach((item) =>
            item.classList.toggle("current", item === entry.target),
          );
        }
      }),
    { threshold: 0.55 },
  );
  $$(".timeline-item").forEach((item) => itemObserver.observe(item));

  const countUp = (element) => {
    const target = Number(element.dataset.count);
    const start = performance.now();
    const duration = 1200;
    const tick = (now) => {
      const p = clamp((now - start) / duration);
      element.textContent = `${Math.round(target * (1 - Math.pow(1 - p, 3)))}+`;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const counterObserver = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
          entry.target.dataset.counted = "true";
          if (reduced)
            entry.target.textContent = `${entry.target.dataset.count}+`;
          else countUp(entry.target);
        }
      }),
    { threshold: 0.5 },
  );
  $$("[data-count]").forEach((element) => counterObserver.observe(element));

  if (finePointer && !reduced) {
    const glow = $(".cursor-glow");
    addEventListener(
      "pointermove",
      (event) => {
        document.body.classList.add("cursor-active");
        glow?.style.setProperty("--cursor-x", `${event.clientX}px`);
        glow?.style.setProperty("--cursor-y", `${event.clientY}px`);
      },
      { passive: true },
    );

    projects.forEach((card) => {
      card.addEventListener("pointermove", (event) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        card.style.setProperty("--tilt-x", `${(0.5 - y) * 4}deg`);
        card.style.setProperty("--tilt-y", `${(x - 0.5) * 5}deg`);
        card.style.setProperty("--card-x", `${x * 100}%`);
        card.style.setProperty("--card-y", `${y * 100}%`);
      });
      card.addEventListener("pointerleave", () => {
        card.style.setProperty("--tilt-x", "0deg");
        card.style.setProperty("--tilt-y", "0deg");
      });
    });

    $$(".button").forEach((button) => {
      button.addEventListener("pointermove", (event) => {
        const rect = button.getBoundingClientRect();
        button.style.setProperty(
          "--mag-x",
          `${(event.clientX - rect.left - rect.width / 2) * 0.11}px`,
        );
        button.style.setProperty(
          "--mag-y",
          `${(event.clientY - rect.top - rect.height / 2) * 0.16}px`,
        );
      });
      button.addEventListener("pointerleave", () => {
        button.style.setProperty("--mag-x", "0px");
        button.style.setProperty("--mag-y", "0px");
      });
    });

    showreel?.addEventListener("pointermove", (event) => {
      const rect = showreel.getBoundingClientRect();
      showreel.style.setProperty(
        "--show-x",
        `${((event.clientX - rect.left) / rect.width) * 100}%`,
      );
      showreel.style.setProperty(
        "--show-y",
        `${((event.clientY - rect.top) / rect.height) * 100}%`,
      );
    });
  }

  if (reduced) {
    heroInner && (heroInner.style.transform = "none");
    heroInner && (heroInner.style.opacity = "1");
  }

  updateScrollEffects();
})();
