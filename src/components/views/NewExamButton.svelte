<script>
  import { goto } from "@sapper/app";
  import { newExam } from "../../lib/exam";
  import Button from "../StyledButton.svelte";
  import Icon from "../Icon.svelte";

  let className = "";
  export { className as class };
  const handler = () => {
    const id = newExam();
    goto(`exams/${id}`);
  };
</script>

<Button class={className} on:click={handler}>
  <Icon name="plus" />
  Új próbavizsga
</Button>
