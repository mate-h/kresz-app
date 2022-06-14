<script>
  import { goto } from "@sapper/app";
  import { relativeFormat } from "../../lib/util";
  import Line from "../Line.svelte";
  import StatusPill from "./StatusPill.svelte";
  import Button from "../StyledButton.svelte";
  import Icon from "../Icon.svelte";
  import { getStats } from "../../lib/exam";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  let className = "";
  export { className as class };
  export let exam;
  // status: started, successful, failed
  let { current, total, score, totalScore, status, errorScore } = getStats(
    exam
  );
  $: {
    const stats = getStats(exam);
    current = stats.current;
    total = stats.total;
    score = stats.score;
    totalScore = stats.totalScore;
    status = stats.status;
    errorScore = stats.errorScore;
  }

  const handler = () => goto(`exams/${exam.id}`);
  const deleteHandler = () => {
    dispatch("delete", { exam });
  };
  let hovering;
</script>

<style>
  .root {
    --visible: 1;
  }
  @media (hover: hover) {
    .root {
      --visible: 0;
    }
  }
  .root:hover {
    --visible: 1;
  }
  .hover-hide {
    opacity: var(--visible);
  }
</style>

<div class={`root flex items-baseline ${className || ''}`}>
  <div class="w-36 flex-shrink">
    <Line top={-4} class="body1">{exam.index + 1}. próbavizsga</Line>
    <Line bottom={8} class="caption text-opacity-54 text-black">
      {relativeFormat(exam.created)}
    </Line>
  </div>
  <div class="px-2 w-30">
    <Line class="body2">{current} / {total}</Line>
  </div>
  <Line class="body2 px-2">{errorScore} hibapont</Line>
  {#if status === 'successful'}
    <StatusPill class="mx-2" color="green">Sikeres</StatusPill>
  {:else if status === 'failed'}
    <StatusPill class="mx-2" color="red">Sikertelen</StatusPill>
  {:else}
    <StatusPill class="mx-2" color="blue">Elkezdett</StatusPill>
  {/if}
  <div
    class="hidden sm:block hover-hide transition duration-75 whitespace-no-wrap">
    <Button class="mx-2" filled={false} on:click={deleteHandler}>
      <Icon class="text-red-500" name="trash.fill" />
    </Button>
    {#if current < total}
      <Button filled={false} on:click={handler}>
        Folytatás
        <Icon name="chevron.right" />
      </Button>
    {/if}
  </div>
</div>
