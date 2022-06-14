<script>
  import { getTargetPosition, debounceType, isTouch, config } from ".";
  import { Ripple, config as rippleConfig } from "../ripple";
  import styleProps from "../../lib/actions/style-props";

  export let bounded = true;
  export let style = "";
  /**
   * dark, light, or image
   */
  export let surface = "light";
  let className = "";
  export { className as class };

  // TODO: bug - double click and drag out, then release

  let ripples = [];
  let pressed = false;
  let hovered = false;
  let focused = false;

  const hoverAlpha = config.STATE_OVERLAY_OPACITY.hover[surface];
  const pressedAlpha = config.STATE_OVERLAY_OPACITY.pressed[surface];
  let rippleAlpha = pressedAlpha;
  if (process.browser) {
    if (window.matchMedia("(hover: hover)").matches) {
      rippleAlpha = pressedAlpha - hoverAlpha;
    }
  }

  const hoverForegroundColors = {
    light: `rgba(0, 0, 0, ${hoverAlpha})`,
    dark: `rgba(255, 255, 255, ${hoverAlpha})`,
    image: `rgba(0, 0, 0, ${hoverAlpha})`,
  };
  const rippleColors = {
    light: "black",
    dark: "white",
    image: "black",
  };

  $: styleVars = {
    overflow: bounded ? "hidden" : "visible",
    foreground: hoverForegroundColors[surface],
  };

  // slot is either: open, visible, or exit
  let rippleSlots = new Array(rippleConfig.MAX_RIPPLES).fill("open");
  let previousActivationEvent;
  const handleDown = debounceType((evt) => {
    if (
      rippleSlots.filter((s) => s !== "open").length >= rippleConfig.MAX_RIPPLES
    ) {
      // This should never happen unless the user is tapping like a maniac
      // or there is a bug that's preventing ripples from being removed.
      return;
    }
    // slot is available if its value is false
    const slotIndex = rippleSlots.findIndex((s) => s === "open");

    const startingPosition = getTargetPosition(evt);
    const activeRipple = {
      target: evt.target,
      startingX: startingPosition.x,
      startingY: startingPosition.y,
      introEnd: () => {
        // slot is NOT available until ripple finished exiting
        const shouldExit = !pressed || rippleSlots.includes("pending");
        if (shouldExit) {
          rippleSlots[slotIndex] = "exit";
        } else rippleSlots[slotIndex] = "pending";
      },
      outroEnd: () => {
        rippleSlots[slotIndex] = "open";
      },
    };

    rippleSlots[slotIndex] = "visible";
    ripples[slotIndex] = activeRipple;
    pressed = true;

    previousActivationEvent = evt;
  });

  const exitPending = () => {
    if (rippleSlots.includes("pending")) {
      rippleSlots = rippleSlots.map((slot) => {
        if (slot === "pending") return "exit";
        return slot;
      });
    }
  };
  const handleUp = debounceType((evt) => {
    exitPending();

    pressed = false;
    focused = false;
  });
  const handleEnter = (evt) => {
    if (!isTouch(evt)) {
      hovered = true;
    }
  };
  const handleLeave = (evt) => {
    if (!isTouch(evt)) {
      exitPending();
      hovered = false;
    }
  };
  const handleFocus = (evt) => {
    focused = true;
  };
  const handleBlur = (evt) => {
    focused = false;
  };
</script>

<style>
  button {
    overflow: var(--overflow);
    position: relative;
    transition: background-color 75ms;
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
    -webkit-touch-callout: none;

    border: none;
    outline: none;
    -webkit-tap-highlight-color: transparent;

    touch-action: none;
    -webkit-touch-action: none;
  }
  button > :global(*) {
    pointer-events: none;
    z-index: 1;
    position: relative;
  }
  button::before {
    transition: background-color 75ms;
    background: transparent;
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  button:hover::before {
    background: var(--foreground);
  }
</style>

<!-- 
 on:touchend={pressed && handleUp}
  on:mouseup={pressed && handleUp}

  on:mousedown={handleDown}
  on:touchstart={handleDown}
 -->

<svelte:window
  on:pointerup={pressed && handleUp}
  on:touchend={pressed && handleUp}
  on:contextmenu={pressed && handleUp} />

<button
  {style}
  on:click
  class={className}
  use:styleProps={styleVars}
  on:pointerdown={handleDown}
  on:touchstart={handleDown}
  on:pointerenter={handleEnter}
  on:pointerleave={handleLeave}
  on:focus={handleFocus}
  on:blur={handleBlur}>
  {#each rippleSlots as slot, i}
    {#if slot === 'visible' || slot === 'pending'}
      <Ripple
        color={rippleColors[surface]}
        alpha={rippleAlpha}
        {bounded}
        ripple={ripples[i]} />
    {/if}
  {/each}
  <slot />
</button>
