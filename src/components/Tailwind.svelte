<style global>
  :root {
    /* Material Design type scale */
    --text-7xl: 96;
    --text-6xl: 60;
    --text-5xl: 48;
    --text-4xl: 34;
    --text-3xl: 30;
    --text-2xl: 24;
    --text-xl: 20;
    --text-lg: 18;
    --text-base: 16;
    --text-sm: 14;
    --text-xs: 12;
    --text-2xs: 10;
  }

  /* Material Design Typography Components */
  /* Leading must be a value divisible by 4 to maintain the grid. */
  .headline1 {
    @apply text-7xl;
    @apply font-light;
    --leading: 112;
    letter-spacing: calc(-1.5 / var(--text-7xl) * 1em);
    font-variation-settings: "wght" 250;
  }
  .headline2 {
    @apply text-6xl;
    @apply font-light;
    --leading: 72;
    letter-spacing: calc(-0.5 / var(--text-6xl) * 1em);
    font-variation-settings: "wght" 300;
  }
  .headline3 {
    @apply text-5xl;
    @apply font-normal;
    --leading: 56;
    font-variation-settings: "wght" 350;
  }
  .headline4 {
    @apply text-4xl;
    @apply font-normal;
    --leading: 40;
    letter-spacing: calc(0.25 / var(--text-4xl) * 1em);
    font-variation-settings: "wght" 400;
  }
  .headline5 {
    @apply text-2xl;
    @apply font-normal;
    --leading: 28;
    font-variation-settings: "wght" 450;
  }
  .headline6 {
    @apply text-xl;
    @apply font-medium;
    --leading: 24;
    letter-spacing: calc(0.15 / var(--text-xl) * 1em);
    font-variation-settings: "wght" 550;
  }
  .subtitle1 {
    @apply text-base;
    @apply font-normal;
    --leading: 24;
    letter-spacing: calc(0.15 / var(--text-base) * 1em);
  }
  .subtitle2 {
    @apply text-sm;
    @apply font-medium;
    --leading: 24;
    letter-spacing: calc(0.1 / var(--text-sm) * 1em);
    font-variation-settings: "wght" 550;
  }
  .body1 {
    @apply text-base;
    @apply font-normal;
    --leading: 28;
    letter-spacing: calc(0.44 / var(--text-base) * 1em);
  }
  .body2 {
    @apply text-sm;
    @apply font-normal;
    --leading: 20;
    letter-spacing: calc(0.25 / var(--text-sm) * 1em);
  }
  .button {
    @apply text-sm;
    @apply font-medium;
    @apply uppercase;
    --leading: 16;
    letter-spacing: calc(1.35 / var(--text-sm) * 1em);
    font-feature-settings: "cpsp";
    font-variation-settings: "wght" 550;
  }
  .caption {
    @apply text-xs;
    @apply font-normal;
    --leading: 16;
    letter-spacing: calc(0.4 / var(--text-xs) * 1em);
  }
  .overline {
    @apply text-2xs;
    @apply font-medium;
    @apply uppercase;
    --leading: 16;
    letter-spacing: calc(1.5 / var(--text-2xs) * 1em);
    font-feature-settings: "cpsp";
    font-variation-settings: "wght" 550;
  }

  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
