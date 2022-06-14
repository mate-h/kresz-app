import { bezier } from './bezier';

// standard CSS "ease"
export const ease = bezier(.25,.1,.25,1);

/** 
 * From Android source
 * https://github.com/aosp-mirror/platform_frameworks_base
 * packages/SystemUI/src/com/android/systemui/Interpolators.java
 * 
 * forced_resizable_enter - 280ms
 * forced_resizable_exit - 160ms
 */

export const linearOutSlowIn = bezier(0, 0, 0.2, 1);
export const fastOutLinearIn = bezier(0.4, 0, 1, 1);

export const fastOutSlowIn = bezier(0.4, 0.0, 0.2, 1);