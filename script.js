const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const siteNav = document.querySelector(".site-nav");
const homeLink = document.querySelector(".home-link");
const sectionLinks = document.querySelectorAll(".site-nav a[href^='#']");
const initialHash = ["#work", "#contact", "#top"].includes(
  window.location.hash,
)
  ? window.location.hash
  : "";
const initialTarget = initialHash
  ? document.querySelector(initialHash)
  : null;

const targetScrollPosition = (target) => {
  const navOffset = target.id === "top" ? 0 : (siteNav?.offsetHeight ?? 0);

  return Math.max(
    0,
    window.scrollY + target.getBoundingClientRect().top - navOffset,
  );
};

if (initialTarget) {
  const alignInitialTarget = () => {
    window.scrollTo(0, targetScrollPosition(initialTarget));
  };

  alignInitialTarget();
  window.history.replaceState(
    null,
    "",
    `${window.location.pathname}${window.location.search}`,
  );
  window.addEventListener("load", alignInitialTarget, { once: true });
  document.fonts?.ready.then(alignInitialTarget);
}

if (window.anime) {
  const { animate, stagger, utils } = window.anime;
  const introText = ".name, .lede, .note, .nav-link";
  const secondaryContent =
    ".role, .section-label, .school h3, .school p, .contact > p, .contact .links";
  const entranceReady =
    document.documentElement.classList.contains("motion-pending");
  const startedScrolled =
    window.scrollY > 1 || Boolean(initialTarget && initialTarget.id !== "top");
  const entranceAnimations = [];
  let entranceActive = false;
  let navDocked = false;
  let portraitAnimation;
  let scrollFrame;

  document.documentElement.dataset.animation = "animejs";

  const isNavDocked = () => siteNav.getBoundingClientRect().top <= 0.5;

  const setNavDocked = (docked, animated = true) => {
    if (docked === navDocked && animated) return;

    navDocked = docked;
    if (portraitAnimation) portraitAnimation.cancel();

    if (docked) siteNav.classList.add("is-docked");

    if (!animated || reducedMotion.matches) {
      utils.set(homeLink, {
        opacity: docked ? 1 : 0,
        scale: docked ? 1 : 0.86,
      });
      siteNav.classList.toggle("is-docked", docked);
      return;
    }

    portraitAnimation = animate(homeLink, {
      opacity: docked ? 1 : 0,
      scale: docked ? 1 : 0.9,
      duration: docked ? 520 : 300,
      ease: docked ? "outQuint" : "inOutCubic",
      onComplete: () => {
        if (!navDocked) siteNav.classList.remove("is-docked");
      },
    });
  };

  const revealEntrance = () => {
    if (!entranceActive) return;

    entranceActive = false;
    for (const animation of entranceAnimations) animation.cancel();
    utils.set(introText, { opacity: 1, translateY: 0 });
    utils.set(".portrait", { opacity: 1, scale: 1 });
    utils.set(secondaryContent, { opacity: 1, translateY: 0 });
  };

  const syncScrollState = () => {
    scrollFrame = undefined;
    if (window.scrollY > 1) revealEntrance();
    setNavDocked(isNavDocked());
  };

  const handleScroll = () => {
    if (scrollFrame) return;
    scrollFrame = window.requestAnimationFrame(syncScrollState);
  };

  setNavDocked(isNavDocked(), false);
  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("resize", () => setNavDocked(isNavDocked(), false));

  if (entranceReady && !startedScrolled && !reducedMotion.matches) {
    utils.set(".name", { opacity: 0, translateY: 8 });
    utils.set(".portrait", { opacity: 0, scale: 0.99 });
    utils.set(".lede", { opacity: 0, translateY: 7 });
    utils.set(".note", { opacity: 0, translateY: 6 });
    utils.set(".nav-link", { opacity: 0, translateY: 4 });
    utils.set(secondaryContent, { opacity: 0, translateY: 7 });
    entranceActive = true;

    window.clearTimeout(window.motionFallback);
    document.documentElement.classList.remove("motion-pending");

    window.requestAnimationFrame(() => {
      if (!entranceActive) return;

      entranceAnimations.push(
        animate(".name", {
          opacity: 1,
          translateY: 0,
          duration: 1250,
          ease: "outCubic",
        }),
      );

      entranceAnimations.push(
        animate(".portrait", {
          opacity: 1,
          scale: 1,
          delay: 90,
          duration: 1320,
          ease: "outCubic",
        }),
      );

      entranceAnimations.push(
        animate(".lede", {
          opacity: 1,
          translateY: 0,
          delay: 190,
          duration: 1210,
          ease: "outCubic",
        }),
      );

      entranceAnimations.push(
        animate(".note", {
          opacity: 1,
          translateY: 0,
          delay: 300,
          duration: 1160,
          ease: "outCubic",
        }),
      );

      entranceAnimations.push(
        animate(".nav-link", {
          opacity: 1,
          translateY: 0,
          delay: stagger(80, { start: 440 }),
          duration: 1040,
          ease: "outCubic",
        }),
      );

      entranceAnimations.push(
        animate(secondaryContent, {
          opacity: 1,
          translateY: 0,
          delay: stagger(55, { start: 980 }),
          duration: 820,
          ease: "outCubic",
          onComplete: () => {
            entranceActive = false;
          },
        }),
      );
    });
  } else {
    window.clearTimeout(window.motionFallback);
    document.documentElement.classList.remove("motion-pending");
  }

  for (const link of sectionLinks) {
    link.addEventListener("click", (event) => {
      if (
        event.defaultPrevented ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;

      event.preventDefault();

      const destination = targetScrollPosition(target);
      if (reducedMotion.matches) {
        window.scrollTo(0, destination);
        return;
      }

      const scrollPosition = { top: window.scrollY };
      animate(scrollPosition, {
        top: destination,
        duration: 950,
        ease: "inOutCubic",
        onUpdate: () => window.scrollTo(0, scrollPosition.top),
      });
    });
  }
} else {
  const syncNav = () => {
    const docked = siteNav.getBoundingClientRect().top <= 0.5;

    siteNav.classList.toggle("is-docked", docked);
    homeLink.style.opacity = docked ? "1" : "0";
  };

  window.clearTimeout(window.motionFallback);
  document.documentElement.classList.remove("motion-pending");
  syncNav();
  window.addEventListener("scroll", syncNav, { passive: true });
}
