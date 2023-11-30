import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Button, Flex, Heading, Radio, RadioGroup, SimpleGrid } from "@chakra-ui/react";
import { useState } from "react";
import { QuizCategory } from "../types/quiz-type";

export function SetQuestionCategory(p: { categories: QuizCategory[]; onClickNext: (categoryId: string) => void }) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(p.categories[0].id.toString());

  const radioList = p.categories.map((i: QuizCategory) => {
    return (
      <Radio key={i.id} value={i.id.toString()}>
        {i.name}
      </Radio>
    );
  });

  return (
    <>
      {" "}
      <Flex direction={"column"} alignItems={"center"}>
        <Heading as={"h1"} fontSize={"3xl"} mb={20}>
          Which topic?
        </Heading>
      </Flex>
      <RadioGroup
        display={"flex"}
        justifyContent={"center"}
        value={selectedCategoryId}
        onChange={setSelectedCategoryId}
      >
        <SimpleGrid columns={[1, 3, 4]} spacing={4} px={10}>
          {radioList}
        </SimpleGrid>
      </RadioGroup>
      <Button
        onClick={() => p.onClickNext(selectedCategoryId)}
        position={"absolute"}
        top={"80%"}
        right={"10%"}
        rightIcon={<ArrowForwardIcon />}
      >
        Set difficutly
      </Button>
    </>
  );
}
