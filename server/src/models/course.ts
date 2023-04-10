import { Schema, model } from "mongoose";

import EnrolledStudent from "./helper/enrolled_student";

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
    ref: 'Teacher',
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  students: [EnrolledStudent.schema],
  estimateTime: Number,
  lessons: [{
    type: Schema.Types.ObjectId,
    ref: "Lesson"
  }]
});

export default model("Course", courseSchema);