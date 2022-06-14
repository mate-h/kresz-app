<script>
  import {
    ios as Button,
    android as ButtonAndroid,
  } from "../components/button";
  import Line from "../components/Line.svelte";
  import Paragraph from "../components/Paragraph.svelte";
  import Divider from "../components/Divider.svelte";
  import rounded from "../lib/actions/rounded";
  import baselined from "../lib/actions/baselined";

  let cornerRadius = 32;
</script>

<style>
  .test {
    height: 36px;
    /* width: 64px; */
    width: 160px;
  }
  .rounded {
    border-radius: calc(var(--r) * 1px);
  }
  .bg-b {
    background-color: #007aff;
  }
</style>

<svelte:head>
  <title>About</title>
</svelte:head>

<section>
  <div class="md:flex">
    <div class="md:flex-shrink-0">
      <img
        use:baselined
        use:rounded={{ radius: cornerRadius }}
        class="md:w-56"
        src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80"
        alt="Woman paying for a purchase" />
    </div>
    <Divider vertical />
    <Divider class="mx-4" vertical hairline={false} />
    <div class="mt-4 md:mt-0 md:ml-6">
      <Line class="overline text-indigo-600">Marketing</Line>
      <Line class="headline6 block mt-1 text-gray-900 hover:underline">
        <a href="#">Finding customers for your new business</a>
      </Line>
      <Paragraph class="body2 mt-2 text-gray-600">
        Getting a new business off the ground is a lot of hard work. Here are
        five ideas you can use to find your first customers.
      </Paragraph>
    </div>
  </div>
  <Button class="my-2">
    <div
      use:rounded={{ radius: cornerRadius }}
      class="button test bg-b text-white">
      <Line top={8} class="button">Learn More</Line>
    </div>
  </Button>
  <div use:rounded={{ radius: cornerRadius }} class="bg-b inline-block my-2">
    <ButtonAndroid surface="dark">
      <div class="button test text-white">
        <Line top={8} class="button">Learn More</Line>
      </div>
    </ButtonAndroid>
  </div>
  <div style={`--r: ${cornerRadius * 0.285}`} class="test rounded bg-red-500" />
  <Divider />
  <div>
    <span style="vertical-align: 4px" class="caption1 w-4 inline-block">
      {cornerRadius}
    </span>
    <input bind:value={cornerRadius} type="range" min="1" max="64" />
  </div>

</section>
