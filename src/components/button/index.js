import { default as ios } from "./button.ios.svelte";
import { default as android } from "./button.android.svelte";

import platform from "../../lib/platform";
export default platform(
  {
    "OS X": ios,
    iOS: ios,
  },
  android
);
export { ios, android };

// Shared platform code

/**
 * Values obtained through experimentation in iOS 13.
 */
export const config = {
  // Touch debounce timing
  TAP_DELAY: 100,
  // Time until scroll gets locked
  SCROLL_STOP: 500,
  // Material Design opacity values
  STATE_OVERLAY_OPACITY: {
    hover: {
      light: 0.04,
      dark: 0.08,
      image: 0.12,
    },
    focus: {
      light: 0.12,
      dark: 0.24,
      image: 0.36,
    },
    selected: {
      light: 0.08,
      dark: 0.16,
      image: 0.24,
    },
    activated: {
      light: 0.12,
      dark: 0.24,
      image: 0.36,
    },
    pressed: {
      light: 0.16,
      dark: 0.32,
      image: 0.48,
    },
    dragged: {
      light: 0.08,
      dark: 0.16,
      image: 0.36,
    },
  },
};

/**
 * Returns the interaction event position relative to the target
 * @param {*} evt Mouse, pointer or touch event
 * @param {*} target The element to measure position against
 */
export function getTargetPosition(evt, target = null) {
  if (!target) target = evt.target;

  const pointerEvents = ["pointerdown", "pointermove", "pointerup"];
  const mouseEvents = ["mousedown", "mousemove", "mouseup"];
  const touchEvents = ["touchstart", "touchmove", "touchend"];
  if (pointerEvents.includes(evt.type) || mouseEvents.includes(evt.type)) {
    return {
      x: evt.offsetX,
      y: evt.offsetY,
    };
  } else if (touchEvents.includes(evt.type)) {
    const viewportOffset = target.getBoundingClientRect();
    const documentX = window.pageXOffset + viewportOffset.left;
    const documentY = window.pageYOffset + viewportOffset.top;
    return {
      x: evt.changedTouches[0].pageX - documentX,
      y: evt.changedTouches[0].pageY - documentY,
    };
  }
}

/**
 * Standard debounce function from lodash
 * @param {*} func
 * @param {*} wait
 * @param {*} immediate
 */
export function debounce(func, wait, immediate) {
  let timeout;
  return function () {
    const context = this,
      args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

/**
 * Avoid reacting to follow-on events fired by touch device after an already-processed user interaction.
 * Usage: wrap your handler function and voila.
 * @param {*} func The function to trigger if with the first received event type
 */
export function debounceType(func) {
  let previousEvent;
  return function (evt) {
    const context = this,
      args = arguments;

    const isSameInteraction =
      previousEvent && evt !== undefined && previousEvent.type !== evt.type;
    if (!isSameInteraction) {
      func.apply(context, args);
      previousEvent = evt;
    } else previousEvent = undefined;
  };
}

/**
 * Whether the event came from a touch device
 * @param {Event} evt
 */
export function isTouch(evt) {
  const pointerEvents = ["pointerdown", "pointermove", "pointerup"];
  const touchEvents = ["touchstart", "touchmove", "touchend"];
  return (
    touchEvents.includes(evt.type) ||
    (pointerEvents.includes(evt.type) && evt.pointerType === "touch")
  );
}
