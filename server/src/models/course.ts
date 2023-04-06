import { Document, Schema, model } from "mongoose"

import { Course } from 'types/course'
import EnrolledStudent from "./helper/Enrolled_student"

const courseSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 5
  },
  category: {
    type: [String],
    required: true,
  },
  teacher: {
    type: Schema.Types.ObjectId,
    ref: 'TeacherModels',
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  students: [EnrolledStudent],
  estimateTime: Number,
  lessons: [{
    type: Schema.Types.ObjectId,
    ref: "LessonModel"
  }]
})

export type ICourseModel = Course & Document

const CourseModels = model<ICourseModel>("Course", courseSchema)

export default CourseModels