import { get } from "svelte/store";
import examData from "./exam-data.js";
import excersizeData from "./exercize-data.js";
import { generateId } from "./util";
import { exams } from "./stores";

export function generate() {
  return examData
    .sort(() => Math.random() - 0.5) // random order
    .map((examItem) => {
      // choose random excersize
      const idx = Math.floor(Math.random() * examItem.indices.length);
      const excersize = excersizeData[examItem.indices[idx]];

      // randomly order answers and mark first as correct
      const answers = excersize.answers
        .map((text, i) =>
          i === 0 ? { text, correct: true } : { text, correct: false }
        )
        .sort(() => Math.random() - 0.5); // random order
      return {
        name: examItem.name,
        score: examItem.score,
        excersize: {
          ...excersize,
          answers,
        },
      };
    });
}

function getNextIndex(current) {
  if (!current) return 0;
  if (Object.values(current).length === 0) return 0;

  return (
    Object.values(current).reduce((acc, curr) => Math.max(acc, curr.index), 0) +
    1
  );
}
export function newExam() {
  const defaults = {
    questionNumber: 0,
    submittedAnswers: [],
  };
  const exam = generate();
  const id = generateId();
  exams.update((current) => ({
    [id]: {
      ...defaults,
      id,
      index: getNextIndex(current),
      created: new Date().getTime(),
      data: exam,
    },
    ...current,
  }));
  return id;
}

export function getStats(exam) {
  const current = exam.submittedAnswers.length;
  const total = exam.data.length;

  const score = exam.submittedAnswers
    .filter((a) => a.correct)
    .reduce((a, c) => c.examItem.score + a, 0);
  const totalScore = exam.submittedAnswers.reduce(
    (a, c) => c.examItem.score + a,
    0
  );
  const errorScore = totalScore - score;
  const status =
    current === total && errorScore <= 10
      ? "successful"
      : errorScore <= 10
      ? "started"
      : "failed";

  return { current, total, score, totalScore, errorScore, status };
}

export function getWrong(exams) {
  return Object.values(exams).reduce(
    (acc, curr) => [...acc, ...curr.submittedAnswers.filter((a) => !a.correct)],
    []
  );
}
