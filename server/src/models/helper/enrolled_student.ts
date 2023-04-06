import { Schema, model } from 'mongoose'

import { StudentInCourse } from 'types/course'

const schema = new Schema<StudentInCourse>({
  student: {
    type: Schema.Types.ObjectId,
    ref: "Student",
    required: true
  },
  status: {
    type: String,
    required: true
  },
  overall: Number,
  finishedDate: String,
  progress: Number
})

const EnrolledStudent = model<StudentInCourse>('EnrolledStudent', schema)

export default EnrolledStudent