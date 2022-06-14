import { cubicOut } from "svelte/easing";

export function flyPercent(
  node,
  {
    delay = 0,
    duration = 400,
    easing: easing$1 = cubicOut,
    x = 0,
    y = 0,
    opacity = 0,
  }
) {
  const style = getComputedStyle(node);
  const target_opacity = +style.opacity;
  const transform = style.transform === "none" ? "" : style.transform;
  const od = target_opacity * (1 - opacity);
  return {
    delay,
    duration,
    easing: easing$1,
    css: (t, u) => `
    transform: ${transform} translate(${(1 - t) * x}%, ${(1 - t) * y}%);
    opacity: ${target_opacity - od * u}`,
  };
}
