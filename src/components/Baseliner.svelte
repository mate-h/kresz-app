<style>
  /* Baseline grid */
  :global(body::after) {
    /* opacity: 0; */
    clip: unset;
    position: absolute;
    width: auto;
    min-height: 100%;
    z-index: 9999;
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
