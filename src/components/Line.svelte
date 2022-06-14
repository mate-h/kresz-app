<script>
  let className = "";
  export { className as class };
  export let style = "";
  /**
   * Top offset from the default leading height. Can be negative, should be multiple of baseline grid.
   */
  export let top = 0; // dp
  /**
   * Bottom offset from the baseline. Can be negative, should be multiple of baseline grid.
   */
  export let bottom = 0; // dp
  if (top % 4 !== 0 || bottom % 4 !== 0) {
    console.warn("Top and bottom props should be a multiple of 4");
  }
  /**
   * Override default leading (line height)
   */
  export let leading = undefined;
  let inlineStyle;
  $: {
    inlineStyle = "";
    inlineStyle += top ? `--top: ${top};` : "";
    inlineStyle += bottom ? `--bottom: ${bottom};` : "";
    inlineStyle += leading ? `--leading: ${leading};` : "";
  }
</script>

<style>
  /* Negative margin of half leading is required for ellipsis */
  /* Alternative method: https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-line-clamp */
  /* 1/16 rem = 0.0625rem = 1 dp = 1 pt */
  p {
    --hl: var(--leading) / 2;
    line-height: 0;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding-bottom: calc((var(--bottom, 0) + var(--hl)) * 0.0625rem);
    margin-bottom: calc(var(--hl) * -0.0625rem);
    height: calc(
      (var(--leading) + var(--top, 0) + var(--bottom, 0) + var(--hl)) *
        0.0625rem
    );
  }
  p::before {
    display: inline-block;
    height: 100%;
    content: "";
  }
</style>

<p class={className} style={style + inlineStyle}>
  <slot />
</p>
