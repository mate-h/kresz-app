export const generateId = () => Math.random().toString(36).substr(2, 9);

export const icon = (name) => {
  const lookup = {
    "person.crop.circle.fill": [56256, 56942],
    "checkmark.circle.fill": [56256, 56419],
    "chevron.left": [56256, 56713],
    "chevron.right": [56256, 56714],
    heart: [56256, 57012],
    "heart.fill": [56256, 57013],
    star: [56256, 57026],
    "star.fill": [56256, 57027],
    "star.lefthalf.fill": [56256, 57028],
    plus: [56256, 56700],
    minus: [56256, 56701],
    "trash.fill": [56256, 56850],
    circle: [56256, 56320],
    "checkmark.circle.fill": [56256, 56419],
    "xmark.circle.fill": [56256, 56417],
    "circle.lefthalf.fill": [56256, 56322],
    "circle.righthalf.fill": [56256, 56323],
    doc: [56256, 56887],
  };
  return lookup[name].map((n) => String.fromCharCode(n)).join("");
};

const language = "hu-HU"; //navigator.language

export const dateFormat = (date) =>
  new Intl.DateTimeFormat(language).format(new Date(date));
export const relativeFormat = (d) => {
  try {
    const diff = new Date().getTime() - new Date(d).getTime();
    const days = diff / (1000 * 3600 * 24);
    const rtf = new Intl.RelativeTimeFormat(language);
    if (days > 31) {
      const months = diff / (1000 * 3600 * 24 * 30.42);
      return rtf.format(Math.ceil(-months), "month");
    }
    if (days > 1) {
      return rtf.format(Math.ceil(-days), "day");
    }
    const hours = diff / (1000 * 3600);
    if (hours >= 1) {
      return rtf.format(Math.ceil(-hours), "hour");
    }
    const minutes = diff / (1000 * 60);
    if (minutes >= 1) {
      return rtf.format(Math.ceil(-minutes), "minute");
    }
    return {
      "hu-HU": "most",
    }[language];
  } catch (e) {
    return dateFormat(d);
  }
};

export const formatPercent = (num) => {
  const option = {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  };
  var formatter = new Intl.NumberFormat(language, option);
  return formatter.format(num);
};

export function getRem() {
  return parseFloat(getComputedStyle(document.documentElement).fontSize);
}

/** Converts rem to CSS pixels */
export function rem2px(rem) {
  return rem * getRem();
}

/** Converts density independent pixels or points to rem */
export function dp2rem(dp) {
  return dp / 16;
}

/** Converts density independent pixels or points to CSS pixels */
export function dp2px(dp) {
  return (dp / 16) * getRem();
}
