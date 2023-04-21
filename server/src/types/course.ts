import { Lesson } from './helper';
import { Teacher } from './user';
import { Types } from 'mongoose';

export interface Course {
  name: string,
  category: string[],
  teacher: Types.ObjectId | Teacher,
  description: string,
  lessons: Array<Types.ObjectId> | Array<Lesson>,
  estimateTime: number
}