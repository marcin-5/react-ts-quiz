import { Box, Flex, HStack, Heading, Radio, RadioGroup, SimpleGrid, Text } from "@chakra-ui/react";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import invalidAnimation from "../assets/lottie/invalid.json";
import validAnimation from "../assets/lottie/valid.json";
import { QuizItem } from "../types/quiz-type";

export function PlayQuiz(p: { quiz: QuizItem[] }) {
  const [currentQuizItemIndex, setCurrentQuizItemIndex] = useState<number>(0);
  const [answer, setAnswer] = useState<string>();
  const [questionStatus, setQuestionStatus] = useState<"valid" | "invalid" | "unanswered">("unanswered");
  const [availableAnswers, setAvailableAnswers] = useState<string[]>([]);
  const [history, setHistory] = useState<boolean[]>([]);
  const currentQuizItem: QuizItem = p.quiz[currentQuizItemIndex];

  const isValidAnswer = (answer: string): boolean => answer === currentQuizItem.correct_answer;

  useEffect(() => {
    if (answer) {
      const isValid = isValidAnswer(answer);
      setQuestionStatus(isValid ? "valid" : "invalid");
      setHistory([...history, isValid]);
    }
  }, [answer]);

  useEffect(() => {
    setAvailableAnswers(
      [currentQuizItem.correct_answer, ...currentQuizItem.incorrect_answers].sort(() => Math.random() - 0.5)
    );
  }, [currentQuizItemIndex]);

  const progressBar = () => {
    return (
      <HStack>
        {p.quiz.map((quizItem, i) => {
          return (
            <Box
              key={i}
              h={3}
              w={25}
              backgroundColor={i >= currentQuizItemIndex ? "gray.200" : history[i] ? "green.300" : "red.300"}
            />
          );
        })}
      </HStack>
    );
  };

  const radioList = availableAnswers.map((answer: string, i: number) => {
    return (
      <Radio key={i} value={answer}>
        <Text
          color={questionStatus === "unanswered" ? "black" : isValidAnswer(answer) ? "green.400" : "red.400"}
          dangerouslySetInnerHTML={{ __html: answer }}
        />
      </Radio>
    );
  });

  return (
    <Flex direction={"column"} alignItems={"center"} justify={"center"} px={10}>
      {progressBar()}
      <Heading fontSize={"3xl"} mt={100} mb={20} dangerouslySetInnerHTML={{ __html: currentQuizItem.question }} />
      <RadioGroup value={answer} onChange={questionStatus === "unanswered" ? setAnswer : undefined}>
        <SimpleGrid columns={2} spacing={4}>
          {radioList}
        </SimpleGrid>
      </RadioGroup>
      <Lottie
        loop={false}
        style={{ marginTop: 100, height: 150 }}
        animationData={
          questionStatus === "unanswered" ? null : questionStatus === "valid" ? validAnimation : invalidAnimation
        }
        onComplete={() => {
          setQuestionStatus("unanswered");
          setCurrentQuizItemIndex(currentQuizItemIndex + 1);
        }}
      />
    </Flex>
  );
}
