import { Course } from "./course";
import { Types } from "mongoose";

export type Lesson = {
  title: string
  content?: Array<{
    title: string
    body: string
  }>
  quiz?: Array<Types.ObjectId> | Array<Quiz>
};

export type Quiz = {
  question: string,
  choices: Array<string>,
  answer: string
};

export type StudyProgress = {
  course: Types.ObjectId | Course
  status: "PASSED" | "FAILED" | "ONGOING"
  overall?: number,
  finishedDate?: string,
  progress?: number
};