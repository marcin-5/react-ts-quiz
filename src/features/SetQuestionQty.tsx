import { Flex, Heading, Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack } from "@chakra-ui/react";
import { useState } from "react";

export function SetQuestionQty(p: { max: number; min: number; step: number; default: number }) {
  const [sliderValue, setSliderValue] = useState<number>(p.default);

  const renderMarks = (): React.ReactNode[] => {
    return Array.from({ length: (p.max - p.min) / p.step + 1 }, (_, i) => (
      <SliderMark key={i} ml={-2} pt={4} value={i * p.step + p.min}>
        {i * p.step + p.min}
      </SliderMark>
    ));
  };

  return (
    <Flex direction={"column"} alignItems={"center"}>
      <Heading as={"h1"} fontSize={"3xl"} mb={20}>
        How many questions?
      </Heading>
      <Slider
        value={sliderValue}
        maxWidth={400}
        max={p.max}
        min={p.min}
        step={p.step}
        colorScheme="yellow"
        aria-label="slider-ex-6"
        onChange={(val) => setSliderValue(val)}
      >
        {renderMarks()}
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>{" "}
    </Flex>
  );
}
