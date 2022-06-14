<script>
  import Button from "../components/button";
  import Line from "../components/Line.svelte";
  import rounded from "../lib/actions/rounded";
  import platform from "../lib/platform";

  let className = "";
  export { className as class };
  export let cornerRadius = 8;
  export let filled = true;
  export let color = "primary";
  export let disabled = false;

  $: c = disabled ? "gray-400" : color;

  const apple = platform(
    {
      iOS: true,
      "OS X": true,
    },
    false
  );
</script>

<style>
  .root {
    height: 36px;
    min-width: 160px;
  }
  :global(.disabled) {
    pointer-events: none;
  }
</style>

{#if filled}
  {#if apple}
    <Button
      on:click
      class={`focus:outline-none ${className || ''} ${disabled ? 'disabled' : ''}`}>
      <div use:rounded={{ radius: cornerRadius * 3.5 }} class={`root bg-${c}`}>
        <Line class="subtitle2 text-white">
          <slot />
        </Line>
      </div>
    </Button>
  {:else}
    <Button
      on:click
      style={`border-radius: ${cornerRadius / 16}rem`}
      class={`focus:outline-none bg-${c} ${className || ''} ${disabled ? 'disabled' : ''}`}
      surface="dark">
      <div class="root">
        <Line class="subtitle2 text-white">
          <slot />
        </Line>
      </div>
    </Button>
  {/if}
{:else}
  <Button
    on:click
    style={`border-radius: ${cornerRadius / 16}rem`}
    class={`px-2 ${className || ''} ${disabled ? 'disabled' : ''}`}>
    <div class="h-9">
      <Line class={`subtitle2 text-${c}`}>
        <slot />
      </Line>
    </div>
  </Button>
{/if}
