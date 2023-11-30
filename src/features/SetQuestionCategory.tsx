import { useEffect, useState } from "react";
import { QuizAPI } from "../api/quiz-api";
import { QuizCategory } from "../types/quiz-type";

export function SetQuestionCategory() {
  const [categories, setCategories] = useState<QuizCategory[]>([]);

  useEffect(() => {
    (async () => {
      setCategories(await QuizAPI.fetchCategories());
    })();
  }, []);

  console.log(">>>", categories);

  return <>SetQuestionCategory</>;
}
