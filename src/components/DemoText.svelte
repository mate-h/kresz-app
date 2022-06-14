<script>
  import Paragraph from "../components/Paragraph.svelte";
  import Line from "../components/Line.svelte";

  export let space = 0;
</script>

<Line class="headline1">Headline 1 testing overflow</Line>
<Line class="headline2">Headline 2</Line>
<Line class="headline3">Headline 3</Line>
<Line class="headline4">Headline 4</Line>
<Line class="headline5">Headline 5</Line>
<Line class="headline6">Headline 6</Line>
<Line class="caption">Caption text</Line>
<Line class="overline" top={space}>Overline text</Line>
<Line class="button">Action Button</Line>
<Paragraph class="subtitle1">
  Traditionally, text is composed to create a readable, coherent, and visually
  satisfying typeface.
</Paragraph>
<Paragraph class="subtitle2">
  Traditionally, text is composed to create a readable, coherent, and visually
  satisfying typeface.
</Paragraph>
<Paragraph class="body1">
  Traditionally, text is composed to create a readable, coherent, and visually
  satisfying typeface that works invisibly, without the awareness of the reader.
  Even distribution of typeset material, with a minimum of distractions and
  anomalies, is aimed at producing clarity and transparency. Choice of
  typeface(s) is the primary aspect of text typography—prose fiction,
  non-fiction, editorial, educational, religious, scientific, spiritual, and
  commercial writing all have differing characteristics and requirements of
  appropriate typefaces and their fonts or styles.
</Paragraph>
<Paragraph class="body2">
  Traditionally, text is composed to create a readable, coherent, and visually
  satisfying typeface that works invisibly, without the awareness of the reader.
  Even distribution of typeset material, with a minimum of distractions and
  anomalies, is aimed at producing clarity and transparency. Choice of
  typeface(s) is the primary aspect of text typography—prose fiction,
  non-fiction, editorial, educational, religious, scientific, spiritual, and
  commercial writing all have differing characteristics and requirements of
  appropriate typefaces and their fonts or styles.
</Paragraph>
