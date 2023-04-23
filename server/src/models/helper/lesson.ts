import { Document, Schema, model } from "mongoose";

import { Lesson } from "types/helper";

export type LessonDocument = Document & Lesson;

const schema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 5
  },
  content: [
    {
      title: {
        type: String,
        required: true,
        minlength: 5
      },
      body: {
        type: String,
        required: true
      }
    }
  ],
  quiz: [
    {
      type: Schema.Types.ObjectId,
      ref: "Quiz"
    }
  ]
});

export default model<LessonDocument>("Lesson", schema);