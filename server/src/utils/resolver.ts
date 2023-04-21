/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { CourseModel, StudentModel, TeacherModel } from "../models";

import { GraphQLError } from "graphql";
import { StudyProgress } from "types/helper";
import bcrypt from "bcrypt";
import config from "./config";
import jwt from "jsonwebtoken";

const resolvers = {
  Query: {
    allCourses: async (
      _root: any,
      args: { name?: string; category?: string }
    ) => {
      if (args.name) {
        return await CourseModel.find({ name: { $in: args.name } }).populate(
          "teacher"
        );
      } else if (args.category) {
        return await CourseModel.find({
          category: { $in: args.category },
        }).populate("teacher");
      }
      return await CourseModel.find({}).populate("teacher");
    },
    getCourseById: async (_root: any, args: { id: string }) => {
      return await CourseModel.findOne({ _id: args.id });
    },
    getLesson: async (
      _root: any,
      args: { id: string },
      contextValue: { token?: string }
    ) => {
      const requestedStudent = contextValue.token
        ? await StudentModel.findById(contextValue.token)
        : null;
      if (requestedStudent) {
        return await CourseModel.findOne({ "lessons._id": args.id });
      }
    },
    getUserCourses: async (_root: any, args: { userID: string }) => {
      const teacher = await TeacherModel.findById(args.userID);
      if (teacher) {
        return await CourseModel.find({ teacher: args.userID }).populate(
          "teacher"
        );
      } else {
        const result: any[] = [];
        const user = await StudentModel.findById(args.userID).populate(
          "studyProgress"
        );
        if (user && user.studyProgress) {
          user.studyProgress.forEach((progress) => {
            const course = CourseModel.findById(progress.course.toString());
            result.push(course);
          });
        }
        return result;
      }
    },
  },
  Mutation: {
    enrollCourse: async (
      _root: any,
      args: { courseID: string },
      contextValue: { token?: string }
    ) => {
      const course = await CourseModel.findOne({ _id: args.courseID });
      const requestedStudent = contextValue.token
        ? await StudentModel.findById(contextValue.token)
        : null;
      if (!course || !requestedStudent) {
        throw new GraphQLError("No course or student found", {
          extensions: {
            code: "BAD_USER_INPUT",
            args: args,
          },
        });
      }
      if (
        requestedStudent.studyProgress.find(
          (obj) => obj.course.toString() === course._id
        )
      ) {
        throw new GraphQLError("Student has already enrolled", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      const newProgress: StudyProgress = {
        course: course,
        status: "ONGOING",
        overall: 0,
        progress: 0,
      };
      try {
        requestedStudent.studyProgress =
          requestedStudent.studyProgress.concat(newProgress);
        await requestedStudent.save();
      } catch (error) {
        throw new GraphQLError("Enrollment failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args,
            error,
          },
        });
      }
      return newProgress;
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
      if (!teacherData || teacherData.role !== "TEACHER") {
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
    createStudent: async (
      _root: any,
      args: { name: string; email: string; password: string }
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
      const newUser = new StudentModel({
        name,
        email,
        role: "STUDENT",
        passwordHash,
        studyProgress: [],
      });
      try {
        await newUser.save();
      } catch (error) {
        throw new GraphQLError("Create new student failed!", {
          extensions: {
            code: "GRAPHQL_VALIDATION_FAILED",
            error,
          },
        });
      }
      return newUser;
    },
    createTeacher: async (
      _root: any,
      args: {
        name: string
        email: string
        organization: string
        password: string
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
      const { name, email, organization } = args;
      const newUser = new TeacherModel({
        name,
        email,
        role: "TEACHER",
        organization,
        passwordHash,
      });
      try {
        await newUser.save();
      } catch (error) {
        throw new GraphQLError("Create new teacher failed!", {
          extensions: {
            code: "GRAPHQL_VALIDATION_FAILED",
            error,
          },
        });
      }
      return newUser;
    },
    // updateProfile: async (
    //   _root: any,
    //   args: {
    //     name?: string
    //     email?: string
    //     courseID?: string
    //     lessonID?: string
    //     answers?: Array<{
    //       quizID: string,
    //       answer: string
    //     }>
    //   },
    //   contextValue: { token?: string }
    // ) => {
    //   switch (args) {

    //   }
    // },
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
          }
        }
        );
      }
      const token = jwt.sign({ id: user._id, email: user.email }, config.SECRET);
      return token;
    },
  },
};

export default resolvers;
