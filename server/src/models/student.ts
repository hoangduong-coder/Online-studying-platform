import { Document, Schema, model } from "mongoose"

import { Student } from "types/user"

const schema = new Schema({
  name: {
    type: String,
    minlength: 5,
    required: true
  },
  email: {
    type: String,
    minlength: 5,
    required: true
  },
  username: {
    type: String,
    minlength: 2,
    required: true,
    unique: true
  }
})

export type IStudentModel = Student & Document

const StudentModels = model<IStudentModel>("Student", schema)
export default StudentModels
