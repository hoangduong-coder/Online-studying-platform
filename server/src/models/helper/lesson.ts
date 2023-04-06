import { Schema, model } from "mongoose"

import { Lesson } from "types/helper"

const schema = new Schema<Lesson>({
  title: {
    type: String,
    required: true,
    minlength: 5
  },
  content: [
    {
      type: Schema.Types.ObjectId,
      ref: "Content"
    }
  ],
  quiz: [
    {
      type: Schema.Types.ObjectId,
      ref: "Quiz"
    }
  ]
})

export default model<Lesson>("Lesson", schema)