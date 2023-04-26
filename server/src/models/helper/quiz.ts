import { Document, Schema, model } from 'mongoose';

import { Quiz } from 'types/helper';

export type QuizDocument = Document & Quiz;
const schema = new Schema({
  question: {
    type: String,
    required: true,
  },
  choices: [{
    type: String,
    required: true
  }],
  answer: {
    type: String,
    required: true,
  },
});
export default model<QuizDocument>("Quiz", schema);