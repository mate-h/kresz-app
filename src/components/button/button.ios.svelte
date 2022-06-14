<script>
  import { onMount, onDestroy } from "svelte";
  import { getTargetPosition, debounce, config, isTouch } from ".";

  export let style = "";
  let className = "";
  export { className as class };
  // 1D or 2D vector that represent touch target box around the center of the element
  export let touchTarget = [];

  // Fix warning
  export const surface = "";

  // TODO: bug - workaround using -webkit-overflow-scrolling and -webkit-touch-action together
  let scrollContainer;
  onMount(() => {
    try {
      // find nearest scrolling container
      let ptr = self;
      let fixed = false;
      while (ptr.parentElement) {
        const style = window.getComputedStyle(ptr);
        if (style.position === "fixed") {
          fixed = true;
          break;
        }
        if (ptr.scrollHeight !== ptr.clientHeight) {
          scrollContainer = ptr;
          break;
        }
        ptr = ptr.parentElement;
      }
      if (!fixed) scrollContainer = document.body;
      scrollContainer.addEventListener("scroll", handleScroll);
    } catch (e) {}
  });
  onDestroy(() => {
    try {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    } catch (e) {}
  });

  let self;
  let pressed = false;
  let hovered = false;
  let pending = false;
  let active = false;
  let back = false;
  let downAt;
  function handleDown(evt) {
    // fix click / tap outside and drag inside, then release
    upEvent = null;
    if (shouldDebounce(evt)) {
      pending = true;
      hovered = true;
      debounce((_evt) => {
        if (pending) {
          downAt = new Date().getTime();
          pending = false;
          pressed = true;
        }
      }, config.TAP_DELAY)(evt);
    } else {
      downAt = new Date().getTime();
      pressed = true;
    }
  }

  function handleScroll(evt) {
    pending = false;
    hovered = false;
    pressed = false;
  }

  function collides(evt) {
    if (self) {
      const viewportOffset = self.getBoundingClientRect();
      const result = getTargetPosition(evt, self);

      let dw = 0;
      let dh = 0;
      // Math.abs: touch target cannot be smaller than the element itself
      if (touchTarget.length === 1) {
        dw = Math.abs(viewportOffset.width - touchTarget[0]);
        dh = Math.abs(viewportOffset.height - touchTarget[0]);
      } else if (touchTarget.length === 2) {
        dw = Math.abs(viewportOffset.width - touchTarget[0]);
        dh = Math.abs(viewportOffset.width - touchTarget[1]);
      }
      // collides
      return (
        result.x >= -dw &&
        result.x <= viewportOffset.width + dw &&
        result.y >= -dh &&
        result.y <= viewportOffset.height + dh
      );
    }
    return false;
  }
  function shouldDebounce(evt) {
    // Only apply debounce on touch devices
    if (isTouch(evt)) {
      // if button is embedded in scrolling content
      if (scrollContainer !== undefined) {
        return true;
      }
      // or there are other conflicting gestures
      // TODO: detect zoom gesture
      // TODO: detect iOS backswipe gesture
    }
    return false;
  }

  function handleMove(evt) {
    if (isTouch(evt) && pressed) {
      hovered = collides(evt);
      if (hovered) back = true;
    }
  }

  let upEvent;
  function handleUp(evt) {
    upEvent = evt;
  }
  let timeout;
  const transitionDuration = 150; //enter 150ms
  $: {
    if (upEvent && pressed) {
      pressed = false;
      // set hovered to false for touch events
      if (isTouch(upEvent)) {
        hovered = false;
      }
      upEvent = null;
      back = false;
    }
    if (pressed && hovered) {
      active = true;
    } else {
      const now = new Date().getTime();
      clearTimeout(timeout);
      const delta = Math.max(0, transitionDuration - (now - downAt));
      if (delta > 0) {
        timeout = setTimeout(() => {
          active = false;
        }, transitionDuration);
      } else active = false;
    }
  }

  function handleEnter(evt) {
    if (!isTouch(evt)) {
      hovered = true;
      if (pressed) back = true;
    }
  }
  function handleLeave(evt) {
    if (!isTouch(evt)) hovered = false;
  }
</script>

<style>
  button {
    position: relative;
    opacity: 1;
    transition: opacity 250ms; /* exit */
    cursor: pointer;

    user-select: none;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
    /* background: transparent; */
    border: none;
    outline: none;
    -webkit-tap-highlight-color: transparent;
  }
  button.active {
    opacity: 0.2;
    transition: opacity 150ms; /* enter */
    touch-action: none;
    -webkit-touch-action: none;
  }
  button.active-back {
    transition: opacity 400ms; /* enter */
  }
</style>

<svelte:window
  on:pointerup={handleUp}
  on:contextmenu={handleUp}
  on:pointermove={pressed && handleMove}
  on:touchend={!window.PointerEvent ? handleUp : () => {}}
  on:touchmove={!window.PointerEvent && pressed ? handleMove : () => {}}
  on:scroll={handleScroll} />

<button
  on:click
  {style}
  bind:this={self}
  class={className}
  class:active
  class:active-back={back}
  on:pointerdown={handleDown}
  on:pointerenter={handleEnter}
  on:pointerleave={handleLeave}
  on:touchstart={!window.PointerEvent ? handleDown : () => {}}>
  <slot />
</button>
