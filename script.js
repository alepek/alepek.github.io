const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const desktopMap = window.matchMedia("(min-width: 641px)");
const sectionLinks = document.querySelectorAll(".intro-links a[href^='#']");
const initialHash = ["#work", "#contact"].includes(window.location.hash)
  ? window.location.hash
  : "";
const initialTarget = initialHash
  ? document.querySelector(initialHash)
  : null;

const targetScrollPosition = (target) =>
  window.scrollY + target.getBoundingClientRect().top;

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
  const introText = ".name, .lede, .note, .intro-links a";
  const secondaryContent = ".role, .school > *, .contact > *";
  const entranceReady =
    document.documentElement.classList.contains("motion-pending");
  const startedScrolled = window.scrollY > 1 || Boolean(initialTarget);
  const entranceAnimations = [];
  let entranceActive = false;
  let mapVisible = startedScrolled;
  let mapAnimation;

  document.documentElement.dataset.animation = "animejs";

  const setMapVisibility = (visible, animated = true) => {
    const shouldShow = desktopMap.matches ? visible : true;

    if (mapAnimation) mapAnimation.cancel();
    mapVisible = shouldShow;

    if (!animated || reducedMotion.matches) {
      utils.set(".spine", { opacity: shouldShow ? 1 : 0 });
      return;
    }

    mapAnimation = animate(".spine", {
      opacity: shouldShow ? 1 : 0,
      duration: shouldShow ? 720 : 420,
      ease: shouldShow ? "outQuint" : "inOutCubic",
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

  const handleScroll = () => {
    if (window.scrollY > 1) revealEntrance();

    if (!desktopMap.matches) return;

    if (!mapVisible && window.scrollY > 1) {
      setMapVisibility(true);
    } else if (mapVisible && window.scrollY <= 1) {
      setMapVisibility(false);
    }
  };

  setMapVisibility(startedScrolled, false);
  window.requestAnimationFrame(() => {
    document.documentElement.classList.remove("map-pending");
  });
  window.addEventListener("scroll", handleScroll, { passive: true });
  desktopMap.addEventListener("change", () => {
    setMapVisibility(window.scrollY > 1, false);
  });

  if (entranceReady && !startedScrolled && !reducedMotion.matches) {
    utils.set(".name", { opacity: 0, translateY: 8 });
    utils.set(".portrait", { opacity: 0, scale: 0.99 });
    utils.set(".lede", { opacity: 0, translateY: 7 });
    utils.set(".note", { opacity: 0, translateY: 6 });
    utils.set(".intro-links a", { opacity: 0, translateY: 4 });
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
        animate(".intro-links a", {
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
  window.clearTimeout(window.motionFallback);
  document.documentElement.classList.remove("map-pending", "motion-pending");
}
