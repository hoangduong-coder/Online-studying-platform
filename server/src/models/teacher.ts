import { Document, Schema, model } from "mongoose";

import { Teacher } from "types/user";

export type TeacherDocument = Teacher & Document;
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
  organization: {
    type: String,
    minlength: 2,
    required: true
  },
  username: {
    type: String,
    minlength: 2,
    required: true,
    unique: true
  }
});

export default model<TeacherDocument>("Teacher", schema);
