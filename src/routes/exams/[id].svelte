<script>
  import { goto } from "@sapper/app";
  import { exams } from "../../lib/stores";
  import { stores } from "@sapper/app";
  import { getStats } from "../../lib/exam";
  import Button from "../../components/StyledButton.svelte";
  import Line from "../../components/Line.svelte";
  import Icon from "../../components/Icon.svelte";
  import Exercise from "../../components/views/Exercise.svelte";

  const { page } = stores();
  const { id } = $page.params;

  let examItem, submission, questionNumber;
  let answered = false;
  let current, total, score, totalScore, status, errorScore;
  $: {
    if (process.browser) {
      questionNumber = $exams[id].questionNumber;
      examItem = $exams[id].data[questionNumber];
      submission = $exams[id].submittedAnswers.find(
        (e) => e.questionNumber === questionNumber
      );
      if (submission) {
        answered = true;
      }

      const exam = $exams[id];
      const stats = getStats(exam);
      current = stats.current;
      total = stats.total;
      score = stats.score;
      totalScore = stats.totalScore;
      status = stats.status;
      errorScore = stats.errorScore;
    }
  }
  const submitAnswer = (evt) => {
    const i = evt.detail;
    answered = true;
    exams.update((e) => ({
      ...e,
      [id]: {
        ...e[id],
        submittedAnswers: [
          ...e[id].submittedAnswers,
          {
            questionNumber: e[id].questionNumber,
            submittedAnswer: i,
            correct: examItem.excersize.answers[i].correct,
            examItem,
          },
        ],
      },
    }));
  };
  const next = () => {
    exams.update((e) => ({
      ...e,
      [id]: {
        ...e[id],
        questionNumber: questionNumber + 1,
      },
    }));
    answered = false;
  };
  const finish = () => {
    goto("exams");
  };
</script>

<svelte:head>
  <title>Próbavizsga | KRESZ</title>
</svelte:head>

{#if examItem}
  <section class="py-4">
    <Exercise
      on:submit={submitAnswer}
      exercise={examItem.excersize}
      {submission}>
      <div slot="info" class="flex">
        <Line top={4} class="caption text-black text-opacity-54 flex-grow">
          {questionNumber + 1} / {total} – {examItem.name}
        </Line>
        <Line
          class={`body2 ${errorScore <= 10 ? 'text-black' : 'text-red-800'}`}>
          {errorScore} hibapont
        </Line>
      </div>
    </Exercise>
    {#if answered && questionNumber + 1 === total}
      <Button class="my-4" on:click={finish}>Befejezés</Button>
    {:else if answered}
      <Button class="my-4" on:click={next}>
        Következő
        <Icon name="chevron.right" />
      </Button>
    {/if}
  </section>
{/if}
