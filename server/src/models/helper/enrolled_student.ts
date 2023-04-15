import { Document, Schema, model } from 'mongoose';

import { StudentInCourse } from 'types/course';

export type EnrolledStudentDocument = Document & StudentInCourse;

const schema = new Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: "User",
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

export default model<EnrolledStudentDocument>('EnrolledStudent', schema);