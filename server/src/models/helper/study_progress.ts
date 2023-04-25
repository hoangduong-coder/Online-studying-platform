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
    enum: ["ONGOING", "PASSED", "FAILED"],
    required: true
  },
  finishedDate: String,
  progressPercentage: Number,
  lessonCompleted: [{
    lesson: {
      type: Schema.Types.ObjectId,
      ref: "Lesson",
    },
    point: Number,
    comments: [{
      quiz: {
        type: Schema.Types.ObjectId,
        ref: "Quiz"
      },
      answer: String,
      comment: String
    }]
  }]
});

export default model<StudyProgressDocument>('StudyProgress', schema);