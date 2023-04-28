import { StudyProgress } from "./helper";

export interface User {
  name: string,
  email: string,
  role: "TEACHER" | "STUDENT",
  passwordHash: string
}

export interface Teacher extends User {
  organization: string,
}

export interface Student extends User {
  studyProgress: Array<StudyProgress>
}
