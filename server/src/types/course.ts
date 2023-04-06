import { Student, Teacher } from './user'

import { Lesson } from './helper'
import { Types } from 'mongoose'

export interface Course {
  name: String,
  category: String[],
  teacher: Types.ObjectId | Teacher,
  description: String,
  students?: Array<StudentInCourse>,
  lessons?: Array<Types.ObjectId> | Array<Lesson>,
  estimateTime: Number
}

export interface StudentInCourse {
  student: Types.ObjectId | Student,
  status: "PASSED" | "FAILED" | "ONGOING"
  overall?: Number,
  finishedDate?: String,
  progress?: number
}