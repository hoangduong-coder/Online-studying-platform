import { Course } from "./course";
import { Types } from "mongoose";

export type Lesson = {
  title: string
  content?: Array<Types.ObjectId> | Array<Content>
  quiz?: Array<Types.ObjectId> | Array<Quiz>
};

export type Content = {
  title: string
  description: string
  body?: string
  material?: Material[]
};

export type Material = {
  materialType: "PDF" | "VIDEO"
  link: string
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