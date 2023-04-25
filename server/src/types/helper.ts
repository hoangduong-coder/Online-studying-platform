import { Types } from "mongoose";

export type Lesson = {
  title: string
  content: string
  quiz: Array<Types.ObjectId>
};

export type Quiz = {
  question: string
  choices: Array<string>
  answer: string
};

export type Comment = {
  quiz: Types.ObjectId,
  answer: string,
  comment: string
};

export type StudyProgress = {
  course: Types.ObjectId
  status: "PASSED" | "FAILED" | "ONGOING"
  finishedDate?: string
  progressPercentage: number
  lessonCompleted: Array<{
    lesson: Types.ObjectId,
    point: number,
    comments: Array<Comment>
  }>
};
