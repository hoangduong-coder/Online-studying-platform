import { Student, Teacher } from './user';

import { Lesson } from './helper';
import { Types } from 'mongoose';

export interface Course {
  name: string,
  category: string[],
  teacher: Types.ObjectId | Teacher,
  description: string,
  students: Array<StudentInCourse>,
  lessons: Array<Types.ObjectId> | Array<Lesson>,
  estimateTime: number
}

export interface StudentInCourse {
  student: Types.ObjectId | Student,
  status: "PASSED" | "FAILED" | "ONGOING"
  overall?: number,
  finishedDate?: string,
  progress?: number
}