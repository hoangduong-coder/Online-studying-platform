import { Schema, model } from 'mongoose';

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
});
export default model("Quiz", schema);