import { Document, Schema, model } from "mongoose";

import { Teacher } from "types/user";
import mongooseUniqueValidator from "mongoose-unique-validator";

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
  },
  passwordHash: {
    type: String,
    required: true,
  }
});

schema.plugin(mongooseUniqueValidator);
export default model<TeacherDocument>("Teacher", schema);
