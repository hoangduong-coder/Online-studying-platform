import { Document, Schema, model } from "mongoose";

import { Course } from "types/course";

export type CourseDocument = Document & Course;

const courseSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 5
  },
  category: {
    type: [String],
    required: true,
  },
  teacher: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  students: [{
    type: Schema.Types.ObjectId,
    ref: "EnrolledStudent"
  }],
  estimateTime: Number,
  lessons: [{
    type: Schema.Types.ObjectId,
    ref: "Lesson"
  }]
});

export default model<CourseDocument>("Course", courseSchema);