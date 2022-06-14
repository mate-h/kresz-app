<script>
  import Line from "../Line.svelte";

  export let color = "green";
  let className = "";
  export { className as class };
</script>

<span
  class={`caption font-semibold px-2 inline-flex rounded-full bg-${color}-100 text-${color}-800 ${className || ''}`}>
  <Line top={-4} bottom={4}>
    <slot />
  </Line>
</span>
