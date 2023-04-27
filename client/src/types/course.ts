export interface Course {
  _id: string,
  name: string,
  category: string[],
  teacher: string,
  description: string,
  lessons: Array<string>,
  estimateTime: number
}