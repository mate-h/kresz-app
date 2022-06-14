<script>
  import { config } from ".";
  import { fastOutSlowIn } from "../../lib/interpolators";
  import styleProps from "../../lib/actions/style-props";

  export let bounded = true;
  export let color = "rgba(0,0,0,1)";
  export let alpha = 0.096;
  export let ripple;
  $: styleVars = { color };

  function getTargetScale(target = ripple.target) {
    const w = target.clientWidth;
    const h = target.clientHeight;
    // return hypotenuse relative to diameter (width)
    if (bounded) return Math.sqrt(w * w + h * h) / w;
    // for unbounded ripple, stay within container element
    return 1;
  }
  function getStartScale(target = ripple.target) {
    // If we have a bound, don't start from 0. Start from 60% of the max out of width and height.
    if (bounded) {
      // TODO: fix equation for vertical buttons
      // Take 60% of the maximum of the width and height
      return 0.6; // 60% of width
    }
    // for unbounded ripple, start from 0
    return 0;
  }
  function clampStartingPosition(x, y, target = ripple.target) {
    const w = target.clientWidth;
    const h = target.clientHeight;
    const cx = w / 2;
    const cy = h / 2;
    const dx = x - cx;
    const dy = y - cy;
    const r = ((getTargetScale(target) - getStartScale(target)) * w) / 2;
    if (dx * dx + dy * dy > r * r) {
      // Point is outside the circle, clamp to the perimeter.
      const angle = Math.atan2(dy, dx);
      const clampedX = cx + Math.cos(angle) * r;
      const clampedY = cy + Math.sin(angle) * r;
      return [clampedX, clampedY];
    }
    return [x, y];
  }
  const style = `
    opacity: ${alpha};
    transform: translate(0, -50%) scale(${getTargetScale()});
  `;

  const lerp = (from, to) => (t) => from + t * (to - from);

  function enter(node, { duration }) {
    const style = getComputedStyle(node);
    const transform = style.transform === "none" ? "" : style.transform;
    const target = node.parentElement;
    const w = target.clientWidth;
    const h = target.clientHeight;

    const fromScale = getStartScale(target);
    const toScale = getTargetScale(target);

    // width is equivalent to diameter as a result of styling
    const r = w / 2;
    const [sx, sy] = clampStartingPosition(
      ripple.startingX || w / 2,
      ripple.startingY || h / 2,
      target
    );
    const fromX = sx - r;
    const fromY = sy - r - h / 2;

    return {
      duration: config.RIPPLE_ENTER_DURATION,
      css: (t, u) => {
        const fast = Math.min(
          1,
          Math.max(
            0,
            t * (config.RIPPLE_ENTER_DURATION / config.OPACITY_ENTER_DURATION)
          )
        );
        const eased = fastOutSlowIn(t);
        const currentScale = lerp(fromScale, toScale)(eased);
        const x = lerp(fromX, 0)(eased);
        const y = lerp(fromY, -r)(eased);
        return `
          opacity: ${fast * alpha};
          transform: translate(${x}px, ${y}px) scale(${currentScale});
        `;
      },
    };
  }

  function exit(node, params) {
    const scale = getTargetScale(node.parentElement);
    return {
      duration: config.OPACITY_EXIT_DURATION,
      css: (t, u) => `
        opacity: ${t * alpha};
        transform: translate(0, -50%) scale(${scale});
      `,
    };
  }
</script>

<style>
  .ripple {
    /* pointer-events: none; */
    position: absolute;
    top: 50%;
    right: 0;
    left: 0;
    padding-top: 100%;
    background: var(--color);
    border-radius: 50%;
    /* background-repeat: no-repeat;
    background-origin: border-box;
    background-image: radial-gradient(circle farthest-side,var(--color) 100%,rgba(0,0,0,0) 100%);
    background-image: -webkit-radial-gradient(circle farthest-side,var(--color) 100%,rgba(0,0,0,0) 100%); */
  }
</style>

<span
  use:styleProps={styleVars}
  {style}
  in:enter
  out:exit
  class="ripple"
  on:introend={ripple.introEnd}
  on:outroend={ripple.outroEnd} />
