import bubbleImg from "@/assets/bubble.png";
import logoImg from "@/assets/logo.png";
import { Box, Flex, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import "../global.css";
import { QuizAPI } from "./api/quiz-api";
import { SetQuestionCategory } from "./features/SetQuestionCategory";
import { SetQuestionQty } from "./features/SetQuestionQty";
import { SetQuizDifficulty } from "./features/SetQuizDifficulty";
import { FetchQuizParams, QuizCategory, QuizDifficulty, QuizItem, QuizType } from "./types/quiz-type";
import { PlayQuiz } from "./features/PlayQuiz";

enum Step {
  SetQuestionQty,
  SetQuestionCategory,
  SetQuestionDifficulty,
  Play,
  Score,
}

export function App() {
  const [step, setStep] = useState<Step>(Step.SetQuestionQty);
  const [quizParams, setQuizParams] = useState<FetchQuizParams>({
    amount: 0,
    category: "",
    difficulty: QuizDifficulty.Mixed,
    type: QuizType.Mixed,
  });
  const [categories, setCategories] = useState<QuizCategory[]>([]);
  const [quiz, setQuiz] = useState<QuizItem[]>([]);

  useEffect(() => {
    (async () => {
      setCategories([{ id: -1, name: "Mixed" }, ...(await QuizAPI.fetchCategories())]);
    })();
  }, []);

  const header = (
    <Flex justify="center">
      <Image h={24} src={logoImg} />
    </Flex>
  );

  const renderScreenByStep = () => {
    switch (step) {
      case Step.SetQuestionQty:
        return (
          <SetQuestionQty
            onClickNext={(amount: number) => {
              setQuizParams({ ...quizParams, amount });
              setStep(Step.SetQuestionCategory);
            }}
            max={30}
            min={5}
            step={5}
            default={10}
          />
        );
      case Step.SetQuestionCategory:
        return (
          <SetQuestionCategory
            categories={categories}
            onClickNext={(category: string) => {
              setQuizParams({ ...quizParams, category: category === "-1" ? "" : category });
              setStep(Step.SetQuestionDifficulty);
            }}
          />
        );
      case Step.SetQuestionDifficulty:
        return (
          <SetQuizDifficulty
            onClickNext={async (difficulty: QuizDifficulty) => {
              const params = { ...quizParams, difficulty };
              setQuizParams(params);
              const quizResp = await QuizAPI.fetchQuiz(params);
              if (quizResp.length > 0) {
                setQuiz(quizResp);
                setStep(Step.Play);
              } else {
                alert(`Couldn't find ${params.amount} questions for this category, restarting game`);
                setStep(Step.SetQuestionQty);
              }
            }}
          />
        );
      case Step.Play:
        return <PlayQuiz quiz={quiz} />;
      case Step.Score:
        return <></>;
      default:
        return null;
    }
  };

  return (
    <Box py={10} h="100%">
      {header}
      <Image src={bubbleImg} position={"absolute"} zIndex={-1} right={0} top={200} />
      <Box mt={100}>{renderScreenByStep()}</Box>
    </Box>
  );
}
