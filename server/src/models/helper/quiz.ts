import { Document, Schema, model } from 'mongoose'

import { Quiz } from 'types/helper'

const schema = new Schema({
  question: {
    type: String,
    required: true,
    minlength: 5
  },
  choices: [{
    type: String,
    required: true
  }],
  answer: {
    type: String,
    required: true,
    minlength: 5
  },
})
export type IQuizModel = Quiz & Document

const QuizModel = model<IQuizModel>("Quiz", schema)

export default QuizModel