import { Student } from "@/types/user";
import { create } from "zustand";

interface StudentState {
  studentInfo: Student,
  updateStudentInfo: (name: string, email: string) => void,
  enrollCourse: (courseID: string) => void,
  answerQuiz: (courseID: string, lessonID: string, answers: Array<{
    quizID: string
    answer: string
  }>) => void
}

const useStore = create<StudentState>()((set) => ({
  studentInfo: {},
  updateStudentInfo: (name, email) => {

  },
  enrollCourse: (courseID) => {

  },
  answerQuiz: (courseID, lessonID, answers) => {

  },
}))