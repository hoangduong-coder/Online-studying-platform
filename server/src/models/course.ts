import { Schema, model } from "mongoose"

import { Course } from "types/course"
import EnrolledStudent from "./helper/enrolled_student"

const courseSchema = new Schema<Course>({
  name: {
    type: String,
    required: true,
    minlength: 5
  },
  category: [{
    type: String,
    required: true,
  }],
  teacher: {
    type: Schema.Types.ObjectId,
    ref: 'Teacher',
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
    ref: "Lesson"
  }]
})

const CourseModels = model<Course>("Course", courseSchema)

export default CourseModels