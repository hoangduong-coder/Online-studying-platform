import { Lesson } from './helper';
import { Types } from 'mongoose';
import { User } from './user';

export interface Course {
  name: string,
  category: string[],
  teacher: Types.ObjectId | User,
  description: string,
  students: Array<StudentInCourse>,
  lessons: Array<Types.ObjectId> | Array<Lesson>,
  estimateTime: number
}

export interface StudentInCourse {
  student: Types.ObjectId | User,
  status: "PASSED" | "FAILED" | "ONGOING"
  overall?: number,
  finishedDate?: string,
  progress?: number
}