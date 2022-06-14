<script>
  import Tailwind from "../components/Tailwind.svelte";
  import Nav from "../components/Nav.svelte";

  export let segment;

  import { TypeInfo } from "../lib/type-info";
  import platform from "platform";
  let osFamily = "";
  if (process.browser) {
    const info = new TypeInfo(document.documentElement);
    console.log(info.current);
    console.log(platform.os.family);
    osFamily = platform.os.family;
  }
</script>

<style global>
  @font-face {
    font-family: "SF Symbols";
    font-weight: 500;
    font-style: normal;
    src: url("/fonts/SFSymbols-Medium.woff2") format("woff2"),
      url("/fonts/SFSymbols-Medium.woff") format("woff"),
      url("/fonts/SFSymbols-Medium.eot") format("embedded-opentype");
  }
  @supports (-webkit-font-smoothing: antialiased) {
    /* Webkit only styles */
  }
  h3,
  h5 {
    margin: 0;
  }

  /* Device pixel ratio */
  :root {
    /* 1 pixel */
    --displayScale: 1;
    --pixel: 1px;

    --rem: 16; /* root element unit */
    --font-family: Inter;
  }
  @supports (font-variation-settings: normal) {
    :root {
      --font-family: "Inter var";
    }
  }
  @supports (font-variation-settings: "cpsp" 1) {
    :root {
      --capital-spacing: 1;
    }
  }
  @media only screen and (-webkit-min-device-pixel-ratio: 1.5),
    only screen and (min-device-pixel-ratio: 1.5),
    only screen and (min-resolution: 1.5dppx) {
    :root {
      --displayScale: 2;
      --pixel: 0.5px;
    }
  }
  @media only screen and (-webkit-min-device-pixel-ratio: 2.5),
    only screen and (min-device-pixel-ratio: 2.5),
    only screen and (min-resolution: 2.5dppx) {
    :root {
      --displayScale: 3;
      --pixel: 0.34px;
    }
  }
  @media only screen and (-webkit-min-device-pixel-ratio: 3.5),
    only screen and (min-device-pixel-ratio: 3.5),
    only screen and (min-resolution: 3.5dppx) {
    :root {
      --displayScale: 4;
      --pixel: 0.25px;
    }
  }

  /* Baseline grid */
  body::before {
    /* opacity: 0; */
    clip: unset;
    position: absolute;
    width: auto;
    min-height: 100%;
    z-index: -1;
    content: "";
    display: block;
    pointer-events: none;
    right: 0px;
    bottom: -1300px;
    left: 0px;
    top: 0px;
    background: linear-gradient(to right, rgba(0, 0, 0, 0) 1px, transparent 1px)
        left top / 8px 100% repeat-x,
      linear-gradient(
          rgba(0, 0, 0, 0.12) var(--pixel),
          transparent var(--pixel)
        )
        left top / 100% 4px repeat-y;
  }
</style>

<Tailwind />

<Nav {segment} />

<main class="sm:container sm:mx-auto mx-auto px-4">
  <slot />
</main>
