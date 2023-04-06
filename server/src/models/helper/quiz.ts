import { Schema, model } from 'mongoose'

import { Quiz } from '../../types/helper'

const schema = new Schema<Quiz>({
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

export default model<Quiz>("Quiz", schema)