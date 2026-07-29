const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (!reducedMotion.matches && "animate" in Element.prototype) {
  const easing = "cubic-bezier(0.22, 1, 0.36, 1)";

  const reveal = (
    element,
    { delay = 0, distance = 18, duration = 650, scale = 1 } = {},
  ) => {
    element.animate(
      [
        {
          opacity: 0,
          transform:
            scale === 1
              ? `translateY(${distance}px)`
              : `scale(${scale})`,
        },
        {
          opacity: 1,
          transform: scale === 1 ? "translateY(0)" : "scale(1)",
        },
      ],
      { delay, duration, easing, fill: "backwards" },
    );
  };

  const introSequence = [
    [document.querySelector(".name"), { delay: 0, distance: 24 }],
    [
      document.querySelector(".portrait"),
      { delay: 90, duration: 700, scale: 0.96 },
    ],
    [document.querySelector(".lede"), { delay: 180, distance: 18 }],
    [document.querySelector(".note"), { delay: 270, distance: 14 }],
  ];

  for (const [element, options] of introSequence) {
    if (element) reveal(element, options);
  }

  const secondaryContent = document.querySelectorAll(
    ".row:not(:first-child) .spine span, .role, .school > *, .contact > *",
  );

  for (const [index, element] of secondaryContent.entries()) {
    reveal(element, {
      delay: 900 + index * 70,
      distance: 14,
      duration: 560,
    });
  }
}
