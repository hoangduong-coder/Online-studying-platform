/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { CourseModel, StudentModel, TeacherModel } from "../models";

import { GraphQLError } from "graphql";
import { StudentInCourse } from "types/course";

interface UserArgsType {
  name: string,
  email: string,
  username: string,
  organization?: string,
}

const resolvers = {
  Query: {
    allCourses: async (_root: any, args: { name?: string; category?: string }) => {
      if (args.name) {
        return await CourseModel.find({ name: { $in: args.name } }).populate("teacher");
      } else if (args.category) {
        return await CourseModel.find({ category: { $in: args.category } }).populate("teacher");
      }
      return await CourseModel.find({}).populate("teacher");
    },
    getCourseById: async (_root: any, args: { id: string }) => {
      return await CourseModel.find({ _id: args.id });
    },
  },
  Mutation: {
    enrollCourse: async (_root: any, args: { studentID: string, courseID: string }) => {
      const requestedStudent = await StudentModel.findById(args.studentID);
      const course = await CourseModel.findOne({ _id: args.courseID });

      if (!course || !requestedStudent) {
        throw new GraphQLError('No course or student found', {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args
          }
        });
      }

      const newStudent: StudentInCourse = {
        student: requestedStudent,
        status: "ONGOING",
        overall: 0,
        progress: 0
      };

      try {
        await CourseModel.findByIdAndUpdate(args.courseID, {
          ...course,
          students: course.students.push({ ...newStudent })
        }, { new: true });
      } catch (error) {
        throw new GraphQLError('Enrollment failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args,
            error
          }
        });
      }

      return newStudent;
    },
    addCourse: async (
      _root: any,
      args: {
        name: string
        category: string[]
        teacherUsername: string
        description: string
        estimateTime: number
      }
    ) => {
      const teacherData = await TeacherModel.findOne({
        username: args.teacherUsername,
      });
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
    createStudent: async (
      _root: any,
      args: UserArgsType
    ) => {
      const newStudent = new StudentModel({ name: args.name, email: args.email, username: args.username });

      try {
        await newStudent.save();
      } catch (error) {
        throw new GraphQLError("Creating new student failed", {
          extensions: {
            code: "GRAPHQL_VALIDATION_FAILED",
            error,
          },
        });
      }

      return newStudent;
    },
    createTeacher: async (
      _root: any,
      args: UserArgsType
    ) => {
      const newTeacher = new TeacherModel({ ...args });

      if (!args.organization) {
        throw new GraphQLError('Missing organization', {
          extensions: {
            code: "BAD_USER_INPUT",
          }
        });
      }

      try {
        await newTeacher.save();
      } catch (error) {
        throw new GraphQLError("Creating new teacher failed", {
          extensions: {
            code: "GRAPHQL_VALIDATION_FAILED",
            error,
          },
        });
      }

      return newTeacher;
    },
  },
};

export default resolvers;
