// @ts-nocheck
class TestCanvas {
  constructor(typeInfo, text, canvas_options) {
    canvas_options = canvas_options || {};
    this.data = [];

    const isSupported = !!document.createElement("canvas").getContext;
    if (!isSupported) {
      return;
    }

    this.typeInfo = typeInfo;
    this.text = text || "abcdefghijklmnopqrstuvwxyz";
    this.canvas_options = {
      fillStyle: "rgb(0,0,0)",
      height: 50,
      size: "40px",
      textBaseline: "top",
      width: 600,
      ...canvas_options,
    };

    this.canvas =
      document.querySelector("canvas") || document.createElement("canvas");
    this.draw();
  }

  getFontOption() {
    return (
      this.typeInfo.style +
      " " +
      this.typeInfo.weight +
      " " +
      this.canvas_options.size +
      " " +
      this.typeInfo.fonts
    );
  }

  draw() {
    // draw the alphabet on canvas
    var ctx = this.canvas.getContext("2d");
    Object.entries(this.canvas_options).forEach((opt, val) => {
      ctx[opt] = val;
    });

    ctx.font = this.getFontOption();
    ctx.fillText(this.text, 0, 0);

    return (this.data = ctx.getImageData(
      0,
      0,
      this.canvas_options.width,
      this.canvas_options.height
    ).data);
  }

  isEqual(otherCanvas) {
    // compare if two pixel arrays are identical
    var len = this.canvas_options.width * this.canvas_options.height * 4,
      i,
      data1 = this.data,
      data2 = otherCanvas.data; // each pixel is 4 bytes (RGBA)
    for (i = 0; i < len; i += 1) {
      if (data1[i] !== data2[i]) {
        return false;
      }
    }

    return true;
  }
}

// Type Info
// -----------------------
// A class generates typography info from a DOM object
export class TypeInfo {
  constructor(element) {
    this.element =
      element instanceof HTMLElement
        ? element
        : document.querySelector(element);
    this.detect();
  }

  static roundFloatWithPxUnit(original) {
    var number = Math.round(parseFloat(original));

    if (isNaN(number)) {
      return "(unknown)";
    } else {
      return Math.round(parseFloat(original)) + "px";
    }
  }

  detect() {
    this.detectBasicCSS();

    this.variant = this.getVariant();
    this.stack = this.fonts.split(/,\s*/);

    this.testCanvas = new TestCanvas(this);
    this.current = this.getCurrentFont();
  }

  getProperty(property) {
    return window
      .getComputedStyle(this.element, null)
      .getPropertyValue(property);
  }

  detectBasicCSS() {
    this.fonts = this.getProperty("font-family");
    this.weight = this.getProperty("font-weight");
    this.style = this.getProperty("font-style");
    this.size = TypeInfo.roundFloatWithPxUnit(this.getProperty("font-size"));
    this.lineHeight = TypeInfo.roundFloatWithPxUnit(
      this.getProperty("line-height")
    );
    this.color = this.getProperty("color");
  }

  getFullCSS() {
    var props = ["font-family", "font-weight", "font-style"],
      css = {},
      p;

    for (p = 0; p < props.length; p++) {
      css[props[p]] = this.getProperty(props[p]);
    }

    return css;
  }

  getVariant() {
    if (this.weight === "normal" && this.style === "normal") {
      return "regular";
    }
    if (this.weight === "normal") {
      return this.style;
    }
    if (this.style === "normal") {
      return this.weight;
    }

    return this.weight + " " + this.style;
  }

  getCurrentFont() {
    // To find out which font is being used,
    // we go throught the the whole stack.
    //
    // For each font F, first we test if it exist
    // by create two canvas, one with F and sans-serif
    // the other with F and serif. By comparing
    // the result, we know F exist if we get the
    // same result from both canvas.
    //
    // If the F exist, then we compare the result of F
    // to the result of the original font stack.
    //
    var stack = this.stack.slice(0),
      f,
      typeInfoSerif,
      typeInfoSansSerif,
      canvasSerif,
      canvasSansSerif,
      typeInfoDefault,
      canvasDefault;

    for (f = 0; f < this.stack.length; f++) {
      typeInfoSerif = {
        ...this,
        fonts: stack[f] + " ,serif",
        stack: [stack[f], "serif"],
      };

      typeInfoSansSerif = {
        ...this,
        fonts: stack[f] + ", sans-serif",
        stack: [stack[f], "sans-serif"],
      };

      canvasSerif = new TestCanvas(typeInfoSerif);
      canvasSansSerif = new TestCanvas(typeInfoSansSerif);

      if (
        canvasSerif.isEqual(canvasSansSerif) &&
        this.testCanvas.isEqual(canvasSerif)
      ) {
        // Found F
        return stack[f];
      }
    }

    // Cannot find any perfect matching font, so we
    // have to guess.
    //
    // Two possiblities: 1. the browser fallback to
    // the default sans-serif or serif. It's impossible
    // to know what is the actual font, but we can guess
    // whether it is sans-serif or serif.
    //
    // 2. We can't find the font due to subsetting
    // (eg H&FJ webfont). In this case, we compare the
    // default font to the original result, if it doesn't
    // match, we blindly guess it is the first font in
    // the font stack is being used.
    //
    if (defaultFont) {
      typeInfoDefault = {
        ...this,
        fonts: defaultFont,
        stack: [defaultFont],
      };

      canvasDefault = new TestCanvas(typeInfoDefault);

      // make sure it is not because of sub setting
      if (this.testCanvas.isEqual(canvasDefault)) {
        return defaultFont;
      }
    }

    return stack[0]; // Can't be detected, guess first element in stack
  }
}
