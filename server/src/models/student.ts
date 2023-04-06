import { Schema, model } from "mongoose"

import { Student } from "../types/user"

const schema = new Schema<Student>({
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
const StudentModels = model<Student>("Student", schema)
export default StudentModels