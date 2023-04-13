import { Document, Schema, model } from "mongoose";

import { Student } from "types/user";
import mongooseUniqueValidator from "mongoose-unique-validator";

export type StudentDocument = Document & Student;

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
  },
  passwordHash: {
    type: String,
    required: true,
  }
});

schema.plugin(mongooseUniqueValidator);


export default model<StudentDocument>("Student", schema);
