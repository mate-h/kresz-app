<script>
  export let vertical = false;
  export let hairline = true;
  let className = "";
  export { className as class };
</script>

<style>
  .vertical.hairline {
    transform: scale(var(--t), 1);
  }
  hr:not(.vertical).hairline {
    transform: scale(1, var(--t));
  }
  .vertical {
    border-left: 1px inset var(--color);
  }
  hr:not(.vertical)::after {
    /* preserve horizontal baselines */
    display: block;
    margin-bottom: -1px;
    content: "";
  }
  hr:not(.vertical) {
    border-top: 1px inset var(--color);
  }
  hr.hairline {
    --t: calc(1 / var(--displayScale));
    --color: rgba(0, 0, 0, calc(0.12 * var(--displayScale)));
  }
  hr {
    --color: rgba(0, 0, 0, 0.12);
    border: none;
    width: auto;
    height: auto;
  }
</style>

<hr class:vertical class:hairline class={className} />
