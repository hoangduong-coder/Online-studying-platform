import { Document, Schema, model } from 'mongoose'

import { StudentInCourse } from 'types/course'

const schema = new Schema<StudentInCourse>({
  student: {
    type: Schema.Types.ObjectId,
    ref: "StudentModels",
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

export type IEnrolledStudentModel = StudentInCourse & Document
const EnrolledStudent = model<IEnrolledStudentModel>('EnrolledStudent', schema)

export default EnrolledStudent