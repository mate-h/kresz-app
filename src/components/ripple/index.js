// DEBUG: animation duration multiplier
const mul = 1;

/**
 * From Android source
 * Repo: https://github.com/aosp-mirror/platform_frameworks_base
 * Path: graphics/java/android/graphics/drawable/RippleForeground.java
 *
 * Note: the previous ripple implementation used a dynamic enter duration based on this function:
 * (1000 * sqrt(targetRadius / 1024 * displayDensityScale) + 0.5)
 */

export const config = {
  // The maximum number of ripples supported.
  MAX_RIPPLES: 10,
  // Time it takes for the ripple to expand
  // and to slide from the touch to the center point
  RIPPLE_ENTER_DURATION: 225 * mul,
  OPACITY_ENTER_DURATION: 75 * mul,
  OPACITY_EXIT_DURATION: 150 * mul,
};

export { default as Ripple } from "./ripple.svelte";

// TODO: CSS Houdini implementation
