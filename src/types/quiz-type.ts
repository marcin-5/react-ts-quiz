export enum QuizDifficulty {
  Mixed = "",
  Easy = "easy",
  Medium = "medium",
  Hard = "hard",
}

export enum QuizType {
  Mixed = "",
  Multiple = "multiple",
  Boolean = "boolean",
}

export interface FetchQuizParams {
  amount: number;
  category: string;
  difficulty: QuizDifficulty;
  type: QuizType;
}
