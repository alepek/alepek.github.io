// The only thing here that CSS can't do yet: know whether a sticky element is
// currently pinned. Shrinking the observer root by 1px at the top means the nav
// stops being fully visible the moment it pins, which flips .is-docked and fades
// in the back-to-top portrait. Everything else — the page fade, anchor offsets,
// the portrait fade itself — is in styles.css.
const nav = document.querySelector(".site-nav");

new IntersectionObserver(
  ([entry]) => nav.classList.toggle("is-docked", !entry.isIntersecting),
  { rootMargin: "-1px 0px 0px 0px", threshold: 1 },
).observe(nav);

// Smooth scrolling is enabled only after load, so loading a URL that already
// carries #work or #contact jumps straight there instead of animating down from
// the top. Anchors still work natively without this, just without the easing.
addEventListener(
  "load",
  () => document.documentElement.classList.add("is-ready"),
  { once: true },
);
