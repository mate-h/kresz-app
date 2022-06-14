import { writable } from "svelte/store";
const createWritableStore = (key, startValue) => {
  const store = writable(startValue);
  const { subscribe, set } = store;

  return {
    ...store,
    useLocalStorage: () => {
      const json = localStorage.getItem(key);
      if (json) {
        set(JSON.parse(json));
      }

      subscribe((current) => {
        localStorage.setItem(key, JSON.stringify(current));
      });
    },
  };
};

export let exams;

if (process.browser) {
  exams = createWritableStore("exams", {});
  exams.useLocalStorage();
} else {
  exams = writable({ loading: true });
}
