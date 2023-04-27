export type Lesson = {
  _id: string
  title: string
  content: string
  quiz: Array<string>
};

export type Quiz = {
  _id: string
  question: string
  choices: Array<string>
  answer: string
};

export type Comment = {
  quiz: string,
  answer: string,
  comment: string
};

export type StudyProgress = {
  _id: string
  course: string
  status: "PASSED" | "FAILED" | "ONGOING"
  finishedDate?: string
  progressPercentage: number
  lessonCompleted: Array<{
    lesson: string,
    point: number,
    comments: Array<Comment>
  }>
};
