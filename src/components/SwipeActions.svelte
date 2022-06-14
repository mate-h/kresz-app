<script>
  import { dp2px } from "../lib/util";
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";

  const progress = tweened(0, {
    duration: 400,
    easing: cubicOut,
  });

  export let actionWidth = 96; // dp

  let scrollContainer;
  let open = false;
  let overflowing = false;
  const onScroll = (e) => {
    scrollContainer = e.target;
    const threshold = dp2px(actionWidth) / 2;
    const overflowThreshold = dp2px(actionWidth) * 1.5;

    if (e.target.scrollLeft > threshold && !open) {
      open = true;
    } else if (e.target.scrollLeft <= threshold && open) {
      open = false;
    }

    if (e.target.scrollLeft > overflowThreshold && !overflowing) {
      overflowing = true;
    } else if (e.target.scrollLeft <= overflowThreshold && overflowing) {
      overflowing = false;
    }
  };
  const doScrollBack = () => {
    const scrollBack = tweened(scrollContainer.scrollLeft, {
      duration: 400,
      easing: cubicOut,
    });
    freeze();

    scrollBack.subscribe((value) => {
      scrollContainer.style.transform = `translateX(${-value}px)`;
    });

    scrollBack.set(0).then(unfreeze);
  };
  const onGesture = (evt) => {
    if (
      window.matchMedia("(hover: hover)").matches &&
      evt.type === "pointerleave" &&
      open
    ) {
      doScrollBack();
      return;
    }

    if (scrollContainer && scrollContainer.contains(evt.target)) {
      return;
    }

    if (open) {
      doScrollBack();
    }
  };

  let parallaxBase;
  const freeze = () => {
    const scrollLeft = scrollContainer.scrollLeft;
    scrollContainer.style.overflow = "visible";
    scrollContainer.style.transform = `translateX(${-scrollLeft}px)`;
    const chrome =
      getComputedStyle(scrollContainer).getPropertyValue("--chrome") === "1";
    if (chrome) {
      if (!parallaxBase)
        parallaxBase = scrollContainer.getElementsByClassName(
          "parallax-base"
        )[0];
      parallaxBase.style["transform-origin"] = `left center`;
    }
    return scrollLeft;
  };
  function unfreeze(scrollLeft = 0) {
    scrollContainer.style.transform = `translateX(0)`;
    scrollContainer.style.overflow = "scroll";
    scrollContainer.style["overflow-y"] = "hidden";
    scrollContainer.scrollLeft = scrollLeft;
    const chrome =
      getComputedStyle(scrollContainer).getPropertyValue("--chrome") === "1";
    if (chrome) {
      parallaxBase.style["transform-origin"] = `right center`;
    }
  }
</script>

<style>
  .chrome {
    display: flex;
    --chrome: 1;
  }
  .safari {
    display: none;
  }
  /* Safari 7.1+ */
  :global(_::-webkit-full-page-media, _:future, .chrome) {
    display: none !important;
  }
  :global(_::-webkit-full-page-media, _:future, .safari) {
    display: block !important;
  }

  .root {
    min-width: 100%;
    display: flex;
    perspective: 1px;
    perspective-origin: center right;
    position: relative;
    transform-style: preserve-3d;
    -webkit-transform-style: preserve-3d;
  }

  .scroll-container {
    scroll-snap-type: x mandatory;
    overflow: scroll;
    overflow-y: hidden;
    position: relative;
    -webkit-overflow-scrolling: touch;
  }
  /* Chrome, Safari and Opera */
  .scroll-container::-webkit-scrollbar {
    display: none;
    -webkit-appearance: none;
    width: 0 !important;
    height: 0 !important;
  }

  /*  IE, Edge and Firefox */
  .scroll-container {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  .child {
    position: relative;
    scroll-snap-align: start;
    min-width: 100%;
  }

  .spacer {
    scroll-snap-align: start;
    min-width: calc(var(--action-width) * 0.0625rem);
  }
  .parallax-base {
    transform: translate3d(0, 0, -1px) scale(2);
    transform-origin: right center;
  }
  .action-base {
    transform: translateX(50%);
  }
  .parallax {
    scroll-snap-align: start;
    min-width: calc(var(--action-width) * 0.0625rem);
    position: -webkit-sticky;
    position: sticky;
    right: 0px;
    transform: translate3d(0, 0, -1px) scale(2);
    -webkit-transform: translate3d(0, 0, -1px) scale(2);
    transform-origin: right center;
  }
</style>

<svelte:window on:pointerdown={onGesture} on:touchstart={onGesture} />

<!-- {#if process.browser && window.matchMedia("@supports (-webkit-overflow-scrolling: touch)")} -->
<div class="overflow-hidden">
  <div
    on:pointerleave={onGesture}
    style={`--action-width: ${actionWidth};`}
    on:scroll={onScroll}
    class="safari scroll-container">
    <div class="root">
      <div class="child">
        <slot />
      </div>
      <div class="parallax">
        <div class="action-base absolute bottom-0 top-0 left-0 right-0">
          <slot name="right-action" />
        </div>
      </div>
    </div>
  </div>
</div>
<!-- {:else}  on:pointerleave={onGesture}  -->
<div class="overflow-hidden">
  <div
    on:pointerleave={onGesture}
    on:scroll={onScroll}
    class="chrome root scroll-container"
    style={`--action-width: ${actionWidth}`}>
    <div class="child">
      <slot />
    </div>
    <div class="spacer relative overflow-hidden">
      <div class="parallax-base absolute bottom-0 top-0 left-0 right-0">
        <slot name="right-action" />
      </div>
    </div>
  </div>
</div>
<!-- {/if} -->
