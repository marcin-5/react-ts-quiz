import { QuizItem } from "../types/quiz-type";

export function PlayQuiz(p: { quiz: QuizItem[] }) {
  console.log(p.quiz);
  return <>Play</>;
}
