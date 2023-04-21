import { Document, Schema, model } from 'mongoose';

import { StudyProgress } from 'types/helper';

export type StudyProgressDocument = Document & StudyProgress;

const schema = new Schema({
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
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

export default model<StudyProgressDocument>('StudyProgress', schema);