/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { CourseModel, StudentModel, TeacherModel } from "../../models";

import { GraphQLError } from "graphql";
import LessonModel from "../../models/helper/lesson";
import QuizModel from "../../models/helper/quiz";
import { StudyProgress } from "types/helper";
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
    if (
      contextValue.currentUser.studyProgress.find(
        //@ts-ignore
        (obj) => obj.course.toString() === course._id.toString()
      )
    ) {
      throw new GraphQLError("Student has already enrolled", {
        extensions: {
          code: "BAD_USER_INPUT",
        },
      });
    }
    const newProgress: StudyProgress = {
      course: course._id,
      status: "ONGOING",
      progressPercentage: 0,
      lessonCompleted: [],
      overallPoint: 0,
      finishedDate: ""
    };
    try {
      contextValue.currentUser.studyProgress =
        contextValue.currentUser.studyProgress.concat([newProgress]);
      await contextValue.currentUser.save();
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
      students: [],
      lessons: [],
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
        studyProgress: [],
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
      choices: string[]
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
      choices: args.choices,
      answer: args.answer,
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
    const lesson = await LessonModel.findById(args.lessonID);
    //Check if user has enrolled the course
    const course = contextValue.currentUser.studyProgress.find(
      //@ts-ignore
      (obj) => obj.course._id.toString() === args.courseID
    );
    if (!(contextValue.currentUser && lesson && course)) {
      throw new GraphQLError("No result found", {
        extensions: { code: "BAD_USER_INPUT" },
      });
    }
    const index = contextValue.currentUser.studyProgress.indexOf(course);
    const result = await helper.quizPoints({ data: args.answers });

    const lessonCompletedStatus = {
      lesson: lesson,
      point: result.point,
      comments: result.commentArray,
    };
    try {
      contextValue.currentUser.studyProgress[index].lessonCompleted =
        contextValue.currentUser.studyProgress[index].lessonCompleted.concat(
          lessonCompletedStatus
        );
      contextValue.currentUser.studyProgress[index].progressPercentage =
        await helper.progressCalculation(
          contextValue.currentUser.studyProgress[index].lessonCompleted,
          args.courseID
        );
      if (
        contextValue.currentUser.studyProgress[index].progressPercentage === 100
      ) {
        const overallPoint = helper.overallPointCalculation(
          contextValue.currentUser.studyProgress[index].lessonCompleted
        );
        if (overallPoint >= 5) {
          contextValue.currentUser.studyProgress[index].overallPoint = overallPoint;
          contextValue.currentUser.studyProgress[index].status = "PASSED";
        } else {
          contextValue.currentUser.studyProgress[index].overallPoint = overallPoint;
          contextValue.currentUser.studyProgress[index].status = "FAILED";
        }
        contextValue.currentUser.studyProgress[index].finishedDate = new Date();
      }
      await contextValue.currentUser.save();
    } catch (error) {
      throw new GraphQLError("Error in updating study progress", {
        extensions: {
          code: "GRAPHQL_VALIDATION_FAILED",
          error,
        },
      });
    }
    return lessonCompletedStatus;
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
};
