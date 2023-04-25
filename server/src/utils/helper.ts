/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Comment } from 'types/helper';
import { CourseModel } from '../../src/models';
import { GraphQLError } from 'graphql';
import LessonModel from "../../src/models/helper/lesson";
import QuizModel from "../../src/models/helper/quiz";
import { Types } from 'mongoose';

interface StudentAnswer {
  quizID: string; answer: string
}

const quizPoints = async (params: {
  data: Array<StudentAnswer>
}) => {
  let finalPoint = 0;
  let comments: { quiz: Types.ObjectId, answer: string, comment: string }[] = [];

  for (const obj of params.data) {
    const quiz = await QuizModel.findById(obj.quizID);
    if (!quiz) {
      throw new GraphQLError("No quiz found", {
        extensions: {
          code: "BAD_USER_INPUT",
          invalidArgs: obj.quizID,
        }
      });
    }
    if (obj.answer === quiz.answer) {
      finalPoint += 1;
      comments = comments.concat({
        quiz: quiz._id,
        answer: obj.answer,
        comment: `Your answer is correct!`
      });
    } else {
      comments = comments.concat({
        quiz: quiz._id,
        answer: obj.answer,
        comment: `Your answer is wrong, the correct one is ${quiz.answer}`
      });
    }
  }

  return {
    point: finalPoint * 10 / params.data.length, commentArray: comments
  };
};

const progressCalculation = async (finished: Comment[], courseID: string) => {
  const course = await CourseModel.findById(courseID).populate("lessons");
  if (course) {
    let quizNumber = 0;
    for (const obj of course.lessons) {
      const lesson = await LessonModel.findById(obj._id);
      if (lesson && lesson.quiz.length > 0) {
        quizNumber += lesson.quiz.length;
      }
    }
    return finished.length * 100 / quizNumber;
  }
  else return 0;
};

const overallPointCalculation = (data: Array<{
  lesson: Types.ObjectId;
  point: number;
  comments: Comment[]
}>) => {
  const sum = data.reduce((prev, curr) => prev + curr.point, 0);
  return sum / (data.length);
};

export default { quizPoints, progressCalculation, overallPointCalculation };
