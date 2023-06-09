import { shuffeldArray } from "./utils";

export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export type StateQuestion = Question & { answers: string[] };

export const fetchQuizQuestions = async (amount: number) => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&type=multiple`;
  const data = await (await fetch(endpoint)).json();
  return data.results.map((question: Question) => ({
    ...question,
    answers: shuffeldArray([
      ...question.incorrect_answers,
      question.correct_answer,
    ]),
  }));
};
