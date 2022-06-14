<script>
  import { icon } from "../lib/util";
  export let name;
  let className = "";
  export { className as class };
  export let style = "";
</script>

<style>
  i {
    font-family: "SF Symbols";
    /* font-size: 24px; */
    font-style: normal;
  }
</style>

<i {style} class={className}>{icon(name)}</i>
