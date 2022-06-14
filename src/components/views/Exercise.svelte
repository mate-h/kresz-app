<script>
  import { createEventDispatcher } from "svelte";
  import baselined from "../../lib/actions/baselined";
  import Paragraph from "../Paragraph.svelte";
  import Icon from "../Icon.svelte";

  export let exercise;
  export let submission;
  let correct, submittedAnswer;
  let answered = false;
  $: {
    if (submission) {
      answered = true;
      correct = submission.correct;
      submittedAnswer = submission.submittedAnswer;
    } else {
      answered = false;
      correct = undefined;
      submittedAnswer = undefined;
    }
  }

  const dispatch = createEventDispatcher();

  const submitAnswer = (i) => {
    correct = exercise.answers[i].correct;
    submittedAnswer = i;
    answered = true;
    dispatch("submit", i);
  };
  const root = "https://storage.googleapis.com/mate-h.appspot.com/content/";
</script>

{#if exercise.type === "image"}
  <img use:baselined class="mx-auto" src={`${root}${exercise.file}`} alt="" />
{:else if exercise.type === "video"}
  <video use:baselined class="mx-auto" controls autoplay>
    <source src={`${root}${exercise.file}`} type="video/mp4" />
    Your browser does not support the video tag.
  </video>
{/if}

<slot name="info" />

<Paragraph top={8} class="headline6">
  {@html exercise.question}
</Paragraph>
{#each exercise.answers as answer, i}
  <div
    class:disabled={answered}
    on:click={answered ? () => {} : () => submitAnswer(i)}
    class:bg-green-100={(submittedAnswer === i && correct) ||
      (correct === false && answer.correct)}
    class:text-green-800={(submittedAnswer === i && correct) ||
      (correct === false && answer.correct)}
    class:bg-red-100={submittedAnswer === i && !correct}
    class:text-red-800={submittedAnswer === i && !correct}
    class={`answer flex px-2 transition duration-75 my-2 rounded-lg ${
      answered ? "" : "hover:bg-opacity-12 hover:bg-black"
    }`}
  >
    <Paragraph class="body1">
      <Icon
        name={submittedAnswer === i
          ? correct
            ? "checkmark.circle.fill"
            : "xmark.circle.fill"
          : "circle"}
      />
    </Paragraph>
    <Paragraph class={`body1 px-2`}>
      {@html answer.text}
    </Paragraph>
  </div>
{/each}

<style>
  .answer {
    padding-bottom: 1rem;
    margin-left: -0.5rem;
    margin-right: -0.5rem;
    cursor: pointer;
  }
  .disabled {
    cursor: default;
  }
  img,
  video {
    max-height: 240px;
    width: auto;
    height: auto;
  }
</style>
