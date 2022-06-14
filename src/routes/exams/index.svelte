<script>
  import { flip } from "svelte/animate";
  import { fade } from "svelte/transition";
  import { goto } from "@sapper/app";
  import { exams } from "../../lib/stores";
  import Line from "../../components/Line.svelte";
  import NewExamButton from "../../components/views/NewExamButton.svelte";
  import ExamListItem from "../../components/views/ExamListItem.svelte";
  import ButtonBase from "../../components/button";
  import Button from "../../components/StyledButton.svelte";
  import Divider from "../../components/Divider.svelte";
  import SwipeActions from "../../components/SwipeActions.svelte";
  import Icon from "../../components/Icon.svelte";
  import Paragraph from "../../components/Paragraph.svelte";

  function deleteAllHandler() {
    if (confirm("Törlöd az összes vizsgát a listából?")) {
      exams.set({});
    }
  }

  function deleteHandler(exam, shouldConfirm = false) {
    let proceed = true;
    if (shouldConfirm) {
      proceed = confirm("Törlöd a vizsgát a listából?");
    }
    if (!proceed) return;

    exams.update((l) => {
      delete l[exam.id];
      return l;
    });
  }
</script>

<style>
  .rounded-border {
    border-radius: 0.5rem;
    /* overflow: hidden; */
  }
  .rounded-border::after {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border: 1px solid rgba(0, 0, 0, 0.12);
    border-radius: 0.5rem;
    content: "";
    pointer-events: none;
  }

  .dynamic-border::after {
    border-bottom: none;
  }
  .dynamic-border:last-child > :last-child:after {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    border-radius: 0.5rem;
    content: "";
    pointer-events: none;
  }
  li {
    --opacity: 1;
  }

  :global(.hover-opacity-b) {
    display: none;
  }
  @media (hover: hover) {
    li {
      --opacity: 0;
    }
    :global(.hover-opacity-b) {
      display: block;
    }
  }
  li:hover {
    --opacity: 1;
  }
  :global(.hover-opacity) {
    opacity: var(--opacity);
  }

  @media (max-width: 639px) {
    .full-width {
      width: 100vw;
      left: 50%;
      right: 50%;
      margin-left: -50vw;
      margin-right: -50vw;
      border-radius: 0rem;
    }
    .full-width::after {
      border-radius: 0rem;
      border-left: none;
      border-right: none;
    }
  }
  :global(.overflow) {
    position: relative;
  }
  :global(.overflow::after) {
    content: "";
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: inherit;
    transform-origin: left center;
    transform: translateX(100%) scaleX(25);
  }
  :global(.above) {
    z-index: 1;
    position: relative;
  }
</style>

<svelte:head>
  <title>Vizsgák | KRESZ</title>
</svelte:head>
<section class="py-4 md:py-6 relative">
  <div class="flex flex-wrap">
    <NewExamButton class="mr-4 md:mr-6 mb-4 md:mb-6" />
    <Button
      disabled={Object.keys($exams).length === 0}
      on:click={() => goto('exams/stats')}
      class="mr-4 md:mr-6 mb-4 md:mb-6">
      Eredmények
    </Button>
    <Button
      disabled={Object.keys($exams).length === 0}
      class="mr-4 md:mr-6 mb-4 md:mb-6"
      color="red-500">
      <Icon name="trash.fill" />
      Összes törlése
    </Button>
  </div>
  <div class="relative">
    {#if process.browser && Object.keys($exams).length > 0}
      <ul
        transition:fade|local={{ duration: 150 }}
        class="rounded-border dynamic-border full-width relative">
        {#each Object.values($exams) as exam, i (exam.id)}
          <li
            out:fade|local={{ duration: 200 }}
            animate:flip={{ duration: 400 }}>
            {#if i !== 0}
              <Divider class="above hover-opacity transition duration-75" />
            {/if}
            <SwipeActions>
              <ExamListItem
                on:delete={() => deleteHandler(exam, true)}
                class="bg-white px-4 md:px-6 py-2 md:py-4"
                {exam} />
              <div slot="right-action" class="h-full">
                <ButtonBase
                  on:click={() => deleteHandler(exam)}
                  surface="dark"
                  class="overflow text-white bg-red-500 h-full w-full flex
                  flex-col justify-center items-center">
                  <Icon class="text-xl h-6" name="trash.fill" />
                  <Line class="caption">Törlés</Line>
                </ButtonBase>
              </div>
            </SwipeActions>
            {#if i !== Object.keys($exams).length - 1}
              <Divider
                class="above hover-opacity hover-opacity-b transition
                duration-75" />
            {/if}
          </li>
        {/each}
      </ul>
    {:else if process.browser}
      <div
        transition:fade|local={{ duration: 150 }}
        class="absolute top-0 left-0 right-0 rounded-border full-width
        overflow-hidden bg-white p-4 md:p-6 text-center flex flex-col
        justify-center items-center text-black text-opacity-54">
        <Icon class="text-xl h-6" name="doc" />
        <Paragraph bottom={8} class="body2">Nincs vizsga a listában</Paragraph>
      </div>
    {/if}
  </div>
</section>
