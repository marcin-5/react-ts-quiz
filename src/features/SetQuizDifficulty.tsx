import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Button, Flex, Heading, Radio, RadioGroup, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { QuizDifficulty } from "../types/quiz-type";

export function SetQuizDifficulty(p: { onClickNext: (difficulty: QuizDifficulty) => void }) {
  const [difficulty, setDifficulty] = useState<QuizDifficulty>(QuizDifficulty.Mixed);

  const radioList = Object.values(QuizDifficulty).map((d: QuizDifficulty) => {
    return (
      <Radio key={d} value={d}>
        <span style={{ textTransform: "capitalize" }}>{d === QuizDifficulty.Mixed ? "Mixed" : d}</span>
      </Radio>
    );
  });

  return (
    <>
      {" "}
      <Flex direction={"column"} alignItems={"center"}>
        <Heading as={"h1"} fontSize={"3xl"} mb={20}>
          Which difficulty?
        </Heading>
      </Flex>
      <RadioGroup value={difficulty} onChange={setDifficulty as (d: string) => void}>
        <VStack>{radioList}</VStack>
      </RadioGroup>
      <Button
        onClick={() => p.onClickNext(difficulty)}
        position={"absolute"}
        top={"80%"}
        right={"10%"}
        rightIcon={<ArrowForwardIcon />}
      >
        Play
      </Button>
    </>
  );
}
