<script>
  import DemoText from "../components/DemoText.svelte";
  import Paragraph from "../components/Paragraph.svelte";
  import Line from "../components/Line.svelte";
  import NewExamButton from "../components/views/NewExamButton.svelte";
</script>

<style>
  section {
    max-width: 43.75rem;
  }
</style>

<svelte:head>
  <title>KRESZ</title>
</svelte:head>

<section class="my-4 md:my-6">
  <Paragraph class="headline4">B kategóriás KRESZ vizsga</Paragraph>
  <Paragraph top={16} bottom={-4} class="headline6">
    Miért jobb ez, mint az e-Titán?
  </Paragraph>
  <Paragraph class="body2">
    <ul class="body2 list-disc px-6">
      <li>Annyit használod amennyit szeretnéd</li>
      <li>Ingyenes</li>
      <li>Nem kell bejelentkezni a fiókodba</li>
      <li>Hozzáférés az összes kérdéshez</li>
      <li>Részletes információk a vizsgáról</li>
      <li>Gyakorlás mobilról, tabletről</li>
      <li>Kibővített funkcionalitás, szebb és letisztultabb felület</li>
    </ul>
  </Paragraph>
  <Paragraph class="headline6">Próbavizsga</Paragraph>
  <Paragraph top={8} class="body2">
    A próbavizsga az eredeti vizsgakérdésekből összeállított 55 kérdés. Minden
    kérdés egy adott témakörből van kiválasztva, és egy témakörön belül több
    kérdés is van, ezért
    <b>összesen 4366 kérdés</b>
    fordulhat elő a vizsgán.
  </Paragraph>
  <NewExamButton class="my-4 md:my-6" />
</section>
