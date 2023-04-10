/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { CourseModel, StudentModel, TeacherModel } from '../src/models';

import { ApolloServer } from '@apollo/server';
import { GraphQLError } from "graphql";
import config from "../src/config";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { startStandaloneServer } from "@apollo/server/standalone";

mongoose.set("strictQuery", false);
dotenv.config();

const MONGO_URI = config.MONGO_URI;
const PORT = config.PORT;

try {
  mongoose.connect(MONGO_URI);
  console.log('successfully connected to', MONGO_URI);
} catch (error) {
  console.log('error connection to', MONGO_URI);
}

const typeDefs = `#graphql
  enum Status {
    PASSED
    FAILED
    ONGOING
  }

  type EnrolledStudent {
    student: Student!
    status: Status!
    overall: Int
    finishedDate: String
    progress: Float
  }

  type Student {
    id: ID!
    username: String!
    name: String!
    email: String!
  }

  type Teacher {
    id: ID!
    name: String!
    username: String!
    email: String!
    organization: String!
  }

  type Lesson {
    id: ID!
    title: String!
    content: [Content!]
    quiz: [Quiz!]
  }

  enum MaterialType {
    PDF
    VIDEO
  }

  type Material {
    id: ID!
    materialType: MaterialType!
    link: String
  }

  type Quiz {
    id: ID!
    question: String!
    choices: [String!]!
    answer: String!
  }

  type Content {
    id: ID!
    title: String!
    description: String!
    body: String
    material: [Material!]
  }

  type Course {
    id: ID!
    name: String!
    category: [String!]!
    teacher: Teacher!
    students: [EnrolledStudent!]
    description: String!
    lessons: [Lesson!]
    
    # calculate in hours
    estimateTime: Float
  }

  type Query {
    allCourses(name: String, category: String): [Course!]
    getCourseById(id: ID!): Course!
  }

  type Mutation {
    enrollCourse(studentID: ID!, courseID: ID!): EnrolledStudent
    addTeacher(name: String!, email: String!, organization: String!): Teacher
    addStudent(name: String!, email: String!): Student
    addCourse(name: String!, category: [String!]!, teacherUsername: String!, description: String!): Course
  }
`;
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
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: PORT },
}).then(
  ({ url }) => console.log(`Server is ready. Go to ${url} for more details.`)
);

