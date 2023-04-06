import { Document, Schema, model } from "mongoose"

import { Lesson } from "types/helper"

const schema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 5
  },
  content: [
    {
      type: Schema.Types.ObjectId,
      ref: "LessonContent"
    }
  ],
  quiz: [
    {
      type: Schema.Types.ObjectId,
      ref: "QuizModel"
    }
  ]
})
export type ILessonModel = Lesson & Document

const LessonModel = model<ILessonModel>("Lesson", schema)
export default LessonModel