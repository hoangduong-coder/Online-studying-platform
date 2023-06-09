import { Document, Schema, model } from "mongoose";

import { Teacher } from "types/user";
import mongooseUniqueValidator from "mongoose-unique-validator";

export type TeacherDocument = Teacher & Document;
const schema = new Schema({
  name: {
    type: String,
    minlength: [5, "Name length must be at least 5, got {VALUE}"],
    required: true
  },
  email: {
    type: String,
    minlength: [5, "Email length must be at least 5, got {VALUE}"],
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true,
  },
  organization: {
    type: String,
    minlength: 2,
  },
});

schema.plugin(mongooseUniqueValidator);
export default model<TeacherDocument>("Teacher", schema);