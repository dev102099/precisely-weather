const progressBar = document.getElementById("progress-bar");
const colors = {
  start: "#92e2f0", // Light blue
  end: "#135ced", // Intense blue
};

let colorProxy = {
  endColor: colors.start,
};

export function updateProgressBar(percentage) {
  const clampedPercent = Math.max(0, Math.min(100, percentage));

  const targetEndColor = gsap.utils.interpolate(
    colors.start,
    colors.end,
    clampedPercent / 100
  );

  gsap.to(progressBar, {
    width: `${clampedPercent}%`,
    duration: 1.5,
    ease: "power2.out",

    onUpdate: function () {
      this.targets()[0].style.background = `linear-gradient(to right, ${colors.start}, ${colorProxy.endColor})`;
    },
  });

  gsap.to(colorProxy, {
    endColor: targetEndColor,
    duration: 1.5,
    ease: "power2.out",
  });
}
