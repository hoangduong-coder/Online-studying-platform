/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Comment } from 'types/helper';
import { CourseModel } from '../../src/models';
import LessonModel from "../../src/models/helper/lesson";
import { Types } from 'mongoose';

interface StudentAnswer {
  quizID: string; answer: string
}

const quizPoints = (params: {
  data: Array<StudentAnswer>, lesson: any
}) => {
  let finalPoint = 0;
  let comments: { quizID: string, answer: string, comment: string }[] = [];
  for (const obj of params.lesson.quiz) {
    const quiz = params.data.find(ans => ans.quizID === obj._id.toString());
    if (quiz) {
      if (obj.answer === quiz.answer.trim()) {
        finalPoint += 1;
        comments = comments.concat({
          quizID: obj._id.toString(),
          answer: quiz.answer,
          comment: `Your answer is correct!`
        });
      }
      else {
        comments = comments.concat({
          quizID: obj._id.toString(),
          answer: quiz.answer,
          comment: `Your answer is wrong, the correct one is ${obj.answer}`
        });
      }
    } else {
      comments = comments.concat({
        quizID: obj._id.toString(),
        answer: "",
        comment: `You have not answer this question!, the correct one is ${obj.answer}`
      });
    }
  }

  return {
    point: finalPoint * 10 / params.lesson.quiz.length, commentArray: comments
  };
};

const progressCalculation = async (finished: any[], courseID: string) => {
  const course = await CourseModel.findById(courseID).populate("lessons");
  if (course) {
    let quizNumber = 0;
    let completedQuiz = 0;
    for (const obj of course.lessons) {
      const lesson = await LessonModel.findById(obj._id);
      if (lesson && lesson.quiz.length > 0) {
        quizNumber += lesson.quiz.length;
      }
    }
    for (const obj of finished) {
      if (obj.comments) {
        completedQuiz += obj.comments.length;
      }
    }
    return completedQuiz * 100 / quizNumber;
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
