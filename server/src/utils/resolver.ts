import { CourseModel, StudentModel, TeacherModel } from "../models";

import { GraphQLError } from "graphql";

const resolvers = {
  Query: {
    allCourses: (_root: any, args: { name?: string, category?: string }) => {
      if (args.name) {
        return CourseModel.find({ name: { $in: args.name } });
      }
      else if (args.category) {
        return CourseModel.find({ category: { $in: args.category } });
      }
      return CourseModel.find({});
    },
    getCourseById: (_root: any, args: { id: string }) => {
      return CourseModel.find({ _id: args.id });
    }
  },
  EnrolledStudent: {
    student: (parent: any) => {
      return StudentModel.findOne({ _id: parent.student.id });
    }
  },
  Course: {
    teacher: (parent: any) => {
      return TeacherModel.findOne({ _id: parent.teacher.id });
    },
  },
  Mutation: {
    //   enrollCourse: (_root: any, args: {studentID: string, courseID: string}) => {
    //     const student = users.find(user => user.id === args.studentID)
    //     const course = courses.find(course => course.id === args.courseID)
    //     if(course?.students.includes(student)) {

    //     }
    //   }
    addCourse: async (_root: any, args: { name: string, category: string[], teacherUsername: string, description: string }) => {
      const teacherData = TeacherModel.findOne({ username: args.teacherUsername });
      const course = new CourseModel({
        ...args,
        teacher: teacherData
      });
      try {
        await course.save();
      } catch (error) {
        throw new GraphQLError("Create new course failed!", {
          extensions: {
            code: "BAD_INPUT",
            invalidArgs: args.name,
            error
          }
        });
      }
      return course;
    }
  },
  createUser: async (_root: any, args: {}) => {

  }
};

export default resolvers