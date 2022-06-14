<script>
  import Divider from "../components/Divider.svelte";
  export let segment;
  let page, aria, classes;
  $: {
    page = (current) => {
      return segment === current || undefined;
    };
    classes = (current) => {
      return page(current) ? "text-opacity-87" : "text-opacity-54";
    };
    aria = (current) => {
      return page(current) ? "page" : undefined;
    };
  }
</script>

<style>
  ul {
    margin: 0;
    padding: 0;
  }

  /* clearfix */
  ul::after {
    content: "";
    display: block;
    clear: both;
  }

  li {
    display: block;
    float: left;
  }

  a:not([aria-current]):hover::after {
    transform: scale(1, 1);
  }
  [aria-current]::after {
    background-color: #007aff;
    transform: scale(1, 1);
    opacity: 1;
  }
  a::after {
    content: "";
    height: 2px;
    margin-top: 1rem;
    background-color: #007aff;
    display: block;
    opacity: 0.54;
    transform: scale(1, 0);
    transform-origin: center bottom;
    transition: transform ease-in-out 150ms, opacity linear 75ms;
  }
  a {
    position: relative;
    display: inline-block;
    -webkit-tap-highlight-color: transparent;
  }
  a::before {
    --top: 4;
    display: inline-block;
    height: calc((var(--leading) + var(--top, 0)) * 0.0625rem);
    content: "";
  }
</style>

<nav class="h-14 px-4 relative">
  <ul>
    <li>
      <a
        class={`body1 transition duration-75 text-primary px-2 ${classes()}`}
        aria-current={aria()}
        href=".">
        Főoldal
      </a>
    </li>
    <li>
      <a
        class={`body1 transition duration-75 text-primary px-2 ${classes('exams')}`}
        aria-current={aria('exams')}
        href="exams">
        Vizsgák
      </a>
    </li>
    <!-- <li>
			<a class={`body1 transition duration-75 text-primary px-2 ${classes('about')}`} 
					aria-current="{aria('about')}" 
					href="about">
					about
			</a>
		</li>
		<li>
			<a class={`body1 transition duration-75 text-primary px-2 ${classes('blog')}`} 
					aria-current="{aria('blog')}" 
					href="blog" rel="prefetch">
					blog
			</a>
		</li> -->
  </ul>
  <Divider class="absolute bottom-0 left-0 right-0" />
</nav>
