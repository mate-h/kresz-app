<script>
  let className = "";
  export { className as class };
  export let style = "";
  /**
   * Top offset from the default leading height of the first line. Can be negative, should be multiple of baseline grid.
   */
  export let top = 0; // dp
  /**
   * Bottom offset from the baseline of the last line. Can be negative, should be multiple of baseline grid.
   */
  export let bottom = 0; // dp
  if (top % 4 !== 0 || bottom % 4 !== 0) {
    console.warn("Top and bottom props should be a multiple of 4");
  }
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
  p {
    --hl: var(--leading) / 2;
    margin-bottom: calc(var(--hl) * -0.0625rem);
    line-height: calc(var(--leading) * 0.0625rem);
  }
  p::before {
    display: inline-block;
    height: calc((var(--leading) + var(--top, 0)) * 0.0625rem);
    content: "";
  }
  p::after {
    display: inline-block;
    vertical-align: calc((var(--bottom, 0) + var(--hl)) * -0.0625rem);
    /* Previewing element height in debug only, not significant */
    /* height: calc((var(--bottom, 0) + var(--hl)) * 0.25rem); */
    content: "";
  }
</style>

<p style={style + inlineStyle} class={className}>
  <slot />
</p>
