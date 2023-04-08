import { Schema, model } from 'mongoose';

const schema = new Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: "Student",
    required: true
  },
  status: {
    type: String,
    required: true
  },
  overall: Number,
  finishedDate: String,
  progress: Number
});

const EnrolledStudent = model('EnrolledStudent', schema);

export default EnrolledStudent;