import { Document, Schema, model } from "mongoose";

import { StudyProgress } from "types/helper";

export type StudyProgressDocument = Document & StudyProgress;

const schema = new Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  status: {
    type: String,
    enum: ["ONGOING", "PASSED", "FAILED"],
    required: true,
  },
  startDate: String,
  overallPoint: Number,
  finishedDate: String,
  progressPercentage: Number,
  lessonCompleted: [
    {
      lesson: {
        type: Schema.Types.ObjectId,
        ref: "Lesson",
        required: true,
      },
      point: Number,
      comments: [
        {
          quizID: String,
          answer: String,
          comment: String,
        },
      ],
    },
  ],
});

export default model<StudyProgressDocument>("StudyProgress", schema);
