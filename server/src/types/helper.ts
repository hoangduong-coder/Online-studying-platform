import { Types } from "mongoose";

export type Lesson = {
  title: string
  content: string
  quiz: Array<Types.ObjectId>
};

export type Quiz = {
  question: string
  choices?: Array<string>
  answer: string
};

export type Comment = {
  quizID: string,
  answer: string,
  comment: string
};

export type StudyProgress = {
  student: Types.ObjectId
  course: Types.ObjectId
  startDate: string
  status: "PASSED" | "FAILED" | "ONGOING"
  finishedDate?: Date
  overallPoint: number
  progressPercentage: number
  lessonCompleted: Array<{
    lesson: Types.ObjectId,
    point: number,
    comments: Array<Comment>

  }>
};
