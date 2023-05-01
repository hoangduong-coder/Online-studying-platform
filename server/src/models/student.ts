import { Document, Schema, model } from "mongoose";

import { Student } from "types/user";
import StudyProgress from "./helper/study_progress";
import mongooseUniqueValidator from "mongoose-unique-validator";

export type StudentDocument = Student & Document;
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
  studyProgress: [StudyProgress.schema]
});

schema.plugin(mongooseUniqueValidator);
export default model<StudentDocument>("Student", schema);