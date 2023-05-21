/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  CourseModel,
  StudentModel,
  StudyProgressModel,
  TeacherModel,
} from "../../models";

import { GraphQLError } from "graphql";
import LessonModel from "../../models/helper/lesson";
import QuizModel from "../../models/helper/quiz";
import bcrypt from "bcrypt";
import config from "../config";
import helper from "../helper";
import jwt from "jsonwebtoken";

export const Mutation = {
  enrollCourse: async (
    _root: any,
    args: { courseID: string },
    contextValue: { currentUser?: any }
  ) => {
    const course = await CourseModel.findById(args.courseID).populate("teacher");
    if (!course || !contextValue.currentUser) {
      throw new GraphQLError("No course or student found", {
        extensions: {
          code: "BAD_USER_INPUT",
          args: args,
        },
      });
    }

    const studyProgress = await StudyProgressModel.findOne({
      student: contextValue.currentUser._id,
      course: course._id,
      status: { $in: ["PASSED", "ONGOING"] },
    });
    if (studyProgress) {
      throw new GraphQLError("Student has already enrolled", {
        extensions: {
          code: "BAD_USER_INPUT",
        },
      });
    }

    const newProgress = new StudyProgressModel({
      student: contextValue.currentUser._id,
      course: course._id,
      status: "ONGOING",
      startDate: new Date(),
      progressPercentage: 0,
      lessonCompleted: [],
      overallPoint: 0,
    });
    try {
      await newProgress.save();
    } catch (error) {
      throw new GraphQLError("Enrollment failed", {
        extensions: {
          code: "BAD_USER_INPUT",
          error,
        },
      });
    }
    return "Successfully enrolled";
  },
  addCourse: async (
    _root: any,
    args: {
      name: string
      category: string[]
      teacherID: string
      description: string
      estimateTime: number
    }
  ) => {
    const teacherData = await TeacherModel.findById(args.teacherID);
    if (!teacherData) {
      throw new GraphQLError("No teacher found!", {
        extensions: {
          code: "BAD_USER_INPUT",
          invalidArgs: args,
        },
      });
    }
    const course = new CourseModel({
      ...args,
      teacher: teacherData,
      lessons: [],
      students: [],
    });
    try {
      await course.save();
    } catch (error) {
      throw new GraphQLError("Create new course failed!", {
        extensions: {
          code: "BAD_USER_INPUT",
          invalidArgs: args.name,
          error,
        },
      });
    }
    return course;
  },
  createUser: async (
    _root: any,
    args: {
      name: string
      email: string
      password: string
      organization?: string
    }
  ) => {
    if (
      args.password.length < 8 ||
      !/\d/.test(args.password) ||
      !/[a-zA-Z]/.test(args.password)
    ) {
      throw new GraphQLError(
        "Wrong password format (>=8 and contains at least 1 letter and 1 digit)",
        {
          extensions: {
            code: "GRAPHQL_VALIDATION_FAILED",
          },
        }
      );
    }
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(args.password, saltRounds);
    const { name, email } = args;
    const newUser = !args.organization
      ? new StudentModel({
        name,
        email,
        passwordHash,
      })
      : new TeacherModel({
        name,
        email,
        passwordHash,
        organization: args.organization,
      });
    try {
      await newUser.save();
    } catch (error) {
      throw new GraphQLError("Create new user failed!", {
        extensions: {
          code: "GRAPHQL_VALIDATION_FAILED",
          error,
        },
      });
    }
    return newUser;
  },
  addLesson: async (
    _root: any,
    args: { courseID: string; title: string; content: string }
  ) => {
    const course = await CourseModel.findById(args.courseID).populate("lessons");
    if (!course)
      throw new GraphQLError("No course found", {
        extensions: {
          code: "BAD_USER_INPUT",
          args: args,
        },
      });
    const newLesson = new LessonModel({
      title: args.title,
      content: args.content,
      quiz: [],
    });
    try {
      await newLesson.save();
      //@ts-ignore
      course.lessons = course.lessons.concat(newLesson);
      await course.save();
    } catch (error) {
      throw new GraphQLError("Create new course failed", {
        extensions: {
          code: "GRAPHQL_VALIDATION_FAILED",
          error,
        },
      });
    }
  },
  addQuiz: async (
    _root: any,
    args: {
      lessonID: string
      question: string
      choices?: string[]
      answer: string
    }
  ) => {
    const lesson = await LessonModel.findById(args.lessonID);
    if (!lesson)
      throw new GraphQLError("No course found", {
        extensions: {
          code: "BAD_USER_INPUT",
          args: args,
        },
      });
    const newQuestion = new QuizModel({
      question: args.question,
      choices: args.choices ? args.choices : [],
      answer: args.answer.trim(),
    });
    try {
      await newQuestion.save();
      //@ts-ignore
      lesson.quiz = lesson.quiz?.concat(newQuestion);
      await lesson.save();
    } catch (error) {
      throw new GraphQLError("Create new quiz failed", {
        extensions: {
          code: "GRAPHQL_VALIDATION_FAILED",
          error,
        },
      });
    }
  },
  answerQuiz: async (
    _root: any,
    args: {
      courseID: string
      lessonID: string
      answers: Array<{
        quizID: string
        answer: string
      }>
    },
    contextValue: { currentUser?: any }
  ) => {
    const lesson = await LessonModel.findById(args.lessonID).populate("quiz");

    //Check if user has enrolled the course
    const progress = await StudyProgressModel.findOne({
      course: args.courseID,
    });

    if (!(contextValue.currentUser && lesson && progress)) {
      throw new GraphQLError("No result found", {
        extensions: { code: "BAD_USER_INPUT" },
      });
    }
    const result = helper.quizPoints({ data: args.answers, lesson: lesson });

    const returnedQuizResult = {
      lesson: lesson._id,
      point: result.point,
      comments: result.commentArray,
    };

    try {
      progress.lessonCompleted =
        progress.lessonCompleted.concat(returnedQuizResult);
      if (progress.status === "ONGOING") {
        progress.progressPercentage = await helper.progressCalculation(
          progress.lessonCompleted,
          args.courseID
        );
        if (progress.progressPercentage === 100) {
          const overallPoint = helper.overallPointCalculation(
            progress.lessonCompleted
          );
          progress.overallPoint = overallPoint;
          progress.status = overallPoint >= 5 ? "PASSED" : "FAILED";

          progress.finishedDate = new Date();
        }

      }
      await progress.save();
    } catch (error) {
      throw new GraphQLError("Error in updating study progress", {
        extensions: {
          code: "GRAPHQL_VALIDATION_FAILED",
          error,
        },
      });
    }
    return returnedQuizResult;
  },
  login: async (_root: any, args: { email: string; password: string }) => {
    const findTeacher = await TeacherModel.findOne({ email: args.email });
    const user = findTeacher
      ? findTeacher
      : await StudentModel.findOne({ email: args.email });
    const password = !user
      ? false
      : await bcrypt.compare(args.password, user.passwordHash);
    if (!(user && password)) {
      throw new GraphQLError("Invalid username or password", {
        extensions: {
          code: "BAD_USER_INPUT",
          invalidArgs: args,
        },
      });
    }
    const token = jwt.sign({ id: user._id, email: user.email }, config.SECRET);
    return `Bearer ${token}`;
  },
  // deleteQuiz: async ({ lessonID, quizID }: { lessonID: any, quizID: any }) => {

  // }
};
