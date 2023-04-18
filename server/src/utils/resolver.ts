/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { CourseModel, UserModel } from "../models";
import { Document, Types } from "mongoose";

import { GraphQLError } from "graphql";
import { StudentInCourse } from "types/course";
import { User } from "types/user";
import { UserDocument } from "models/user";
import bcrypt from "bcrypt";
import config from "./config";
import jwt from "jsonwebtoken";

const resolvers = {
  Query: {
    allCourses: async (_root: any, args: { name?: string; category?: string }) => {
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
    getLesson: async (_root: any, args: { id: string }) => {
      return await CourseModel.findOne({ "lessons._id": args.id });
    },
    getTeacherCourses: async (_root: any, args: { teacherID: string }) => {
      return await CourseModel.find({ "teacher": args.teacherID }).populate("teacher");
    },
    me: async (_root: any, context: { tokenDetails?: string }) => {
      if (context.tokenDetails && context.tokenDetails.startsWith("Bearer ")) {
        const token = jwt.verify(context.tokenDetails.substring(7), config.SECRET);
        const currentUser = await UserModel.findById(token);
        if (!currentUser)
          throw new GraphQLError("User is not authenticated", {
            extensions: {
              code: "UNAUTHENTICATED",
              http: { status: 401 },
            },
          });
        return currentUser;
      }
    },
  },
  Mutation: {
    enrollCourse: async (
      _root: any,
      args: { courseID: string },
      context: {
        currentUser: Document<unknown, {}, UserDocument> &
        Omit<User & Document<any, any, any> & { _id: Types.ObjectId }, never>
      }
    ) => {
      const course = await CourseModel.findOne({ _id: args.courseID }).populate(
        {
          path: "students",
          populate: { path: "student" },
        }
      );
      const requestedStudent = context.currentUser;

      if (!course || !requestedStudent || requestedStudent.role !== "STUDENT") {
        throw new GraphQLError("No course or student found", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args,
          },
        });
      }

      if (
        course.students.filter(
          (obj) => obj.student.toString === requestedStudent._id
        )
      ) {
        throw new GraphQLError("Student has already enrolled", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const newStudent: StudentInCourse = {
        student: requestedStudent,
        status: "ONGOING",
        overall: 0,
        progress: 0,
      };

      try {
        await CourseModel.findByIdAndUpdate(
          args.courseID,
          {
            ...course,
            students: course.students.push({ ...newStudent }),
          },
          { new: true }
        );
      } catch (error) {
        throw new GraphQLError("Enrollment failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args,
            error,
          },
        });
      }

      return newStudent;
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
      const teacherData = await UserModel.findById(args.teacherID);
      if (!teacherData || teacherData.role !== "TEACHER") {
        throw new GraphQLError("No course or student found", {
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
            code: "BAD_INPUT",
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
        organization?: string
        password: string
        role: "TEACHER" | "STUDENT"
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
      const { name, email, role } = args;

      const newUser = new UserModel({ name, email, role, passwordHash });
      if (role === "TEACHER") {
        if (args.organization) {
          newUser["organization"] = args.organization;
        } else {
          throw new GraphQLError("Must have organization for teachers", {
            extensions: { code: "BAD_USER_INPUT" },
          });
        }
      }
      if (role === "STUDENT" && args.organization) {
        throw new GraphQLError("Only teacher can have a teaching organization", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }

      try {
        await newUser.save();
      } catch (error) {
        throw new GraphQLError("Creating new user failed", {
          extensions: {
            code: "GRAPHQL_VALIDATION_FAILED",
            error,
          },
        });
      }

      return newUser;
    },
    login: async (_root: any, args: { email: string; password: string }) => {
      const user = await UserModel.findOne({ email: args.email });
      const password = !user
        ? false
        : await bcrypt.compare(args.password, user.passwordHash);
      if (!(user && password)) {
        throw new GraphQLError("Invalid username or password", {
          extensions: {
            code: "BAD_USER_INPUT",
            args,
          },
        });
      }
      const token = jwt.sign(
        { user: user._id, email: user.email },
        config.SECRET
      );
      return token;
    },
  },
};

export default resolvers;
