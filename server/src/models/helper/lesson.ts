import { Schema, model } from "mongoose";

const schema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 5
  },
  content: [
    {
      type: Schema.Types.ObjectId,
      ref: "Lesson"
    }
  ],
  quiz: [
    {
      type: Schema.Types.ObjectId,
      ref: "Quiz"
    }
  ]
});

export default model("Lesson", schema);