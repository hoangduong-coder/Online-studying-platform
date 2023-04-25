import { Types } from 'mongoose';

export interface Course {
  name: string,
  category: string[],
  teacher: Types.ObjectId,
  description: string,
  lessons: Array<Types.ObjectId>,
  estimateTime: number
}