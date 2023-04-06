import { Types } from 'mongoose'

export interface Course {
  name: string,
  category: string[],
  teacher: Types.ObjectId,
  description: string,
  students?: Array<StudentInCourse>,
  lessons?: Array<Types.ObjectId>,
  estimateTime: number
}

export interface StudentInCourse {
  student: Types.ObjectId,
  status: "PASSED" | "FAILED" | "ONGOING"
  overall?: number,
  finishedDate?: string,
  progress?: number
}