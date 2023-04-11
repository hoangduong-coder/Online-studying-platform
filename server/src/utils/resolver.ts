import { CourseModel, StudentModel, TeacherModel } from "../models"

import EnrolledStudent from "models/helper/enrolled_student";
import { GraphQLError } from "graphql"

interface UserArgsType {
  name: string,
  email: string,
  username: string,
  organization?: string,
}

const resolvers = {
  Query: {
    allCourses: (_root: any, args: { name?: string; category?: string }) => {
      if (args.name) {
        return CourseModel.find({ name: { $in: args.name } })
      } else if (args.category) {
        return CourseModel.find({ category: { $in: args.category } })
      }
      return CourseModel.find({})
    },
    getCourseById: (_root: any, args: { id: string }) => {
      return CourseModel.find({ _id: args.id })
    },
  },
  EnrolledStudent: {
    student: (parent: any) => {
      return StudentModel.findOne({ _id: parent.student.id })
    },
  },
  Course: {
    teacher: (parent: any) => {
      return TeacherModel.findOne({ _id: parent.teacher.id })
    },
  },
  Mutation: {
    enrollCourse: async (_root: any, args: { studentID: string, courseID: string }) => {
      const requestedStudent = StudentModel.findById(args.studentID)
      // const course = CourseModel.findById(args.courseID).populate("students")

      const newStudent = new EnrolledStudent({
        student: requestedStudent,
        status: "ONGOING",
        overall: 0,
        progress: 0
      })

      try {
        await newStudent.save()
      } catch (error) {
        throw new GraphQLError('Enrollment failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args,
            error
          }
        })
      }

      return newStudent
    },
    addCourse: async (
      _root: any,
      args: {
        name: string
        category: string[]
        teacherUsername: string
        description: string
      }
    ) => {
      const teacherData = TeacherModel.findOne({
        username: args.teacherUsername,
      })
      const course = new CourseModel({
        ...args,
        teacher: teacherData,
      })
      try {
        await course.save()
      } catch (error) {
        throw new GraphQLError("Create new course failed!", {
          extensions: {
            code: "BAD_INPUT",
            invalidArgs: args.name,
            error,
          },
        })
      }
      return course
    },
    createStudent: async (
      _root: any,
      args: UserArgsType
    ) => {
      const newStudent = new StudentModel({ name: args.name, email: args.email, username: args.username })

      try {
        await newStudent.save()
      } catch (error) {
        throw new GraphQLError("Creating new student failed", {
          extensions: {
            code: "GRAPHQL_VALIDATION_FAILED",
            error,
          },
        })
      }

      return newStudent
    },
    createTeacher: async (
      _root: any,
      args: UserArgsType
    ) => {
      const newTeacher = new TeacherModel({ ...args })

      if (!args.organization) {
        throw new GraphQLError('Missing organization', {
          extensions: {
            code: "BAD_USER_INPUT",
          }
        })
      }

      try {
        await newTeacher.save()
      } catch (error) {
        throw new GraphQLError("Creating new teacher failed", {
          extensions: {
            code: "GRAPHQL_VALIDATION_FAILED",
            error,
          },
        })
      }

      return newTeacher
    },
  },
}

export default resolvers
