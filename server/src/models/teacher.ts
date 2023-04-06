import { Document, Schema, model } from "mongoose"

import { Teacher } from "types/user"

const schema: Schema = new Schema<Teacher>({
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
  organization: {
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

export type ITeacherModel = Teacher & Document
const TeacherModels = model<ITeacherModel>("Teacher", schema)
export default TeacherModels