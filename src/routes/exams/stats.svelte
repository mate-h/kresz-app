<script>
  import { exams } from "../../lib/stores";
  import { getWrong } from "../../lib/exam";
  import Button from "../../components/StyledButton.svelte";
  import Line from "../../components/Line.svelte";
  import Icon from "../../components/Icon.svelte";
  import Exercise from "../../components/views/Exercise.svelte";

  let questionNumber = 0;
  let answered = false;
  let submissions, submission, total;
  $: {
    if (process.browser) {
      submissions = getWrong($exams);
      submission = submissions[questionNumber];
      total = submissions.length;
    }
  }

  const prev = () => {
    questionNumber -= 1;
    if (questionNumber < 0) questionNumber = total - 1;
  };
  const next = () => {
    questionNumber += 1;
    if (questionNumber >= total) questionNumber = 0;
  };
</script>

<svelte:head>
  <title>Eredmények | KRESZ</title>
</svelte:head>
{#if submission}
  <section class="py-4">
    <Button class="my-4" on:click={prev}>
      <Icon name="chevron.left" />
      Előző
    </Button>
    <Button class="my-4 mx-4" on:click={next}>
      Következő
      <Icon name="chevron.right" />
    </Button>
    <Exercise exercise={submission.examItem.excersize} {submission}>
      <div slot="info" class="flex">
        <Line top={4} class="caption text-black text-opacity-54 flex-grow">
          {questionNumber + 1} / {total} – {submission.examItem.name}
        </Line>
      </div>
    </Exercise>
  </section>
{/if}
