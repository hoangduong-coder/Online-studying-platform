/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { CourseModel, StudentModel, TeacherModel } from '../src/models/index';
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
    await mongoose.connect(MONGO_URI);
    console.log('successfully connected to', MONGO_URI);
}
catch (error) {
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
        allCourses: (_root, args) => {
            if (args.name) {
                return CourseModel.find({ name: { $in: args.name } });
            }
            else if (args.category) {
                return CourseModel.find({ category: { $in: args.category } });
            }
            return CourseModel.find({});
        },
        getCourseById: (_root, args) => {
            return CourseModel.find({ _id: args.id });
        }
    },
    EnrolledStudent: {
        student: (parent) => {
            return StudentModel.findOne({ _id: parent.student.id });
        }
    },
    Course: {
        teacher: (parent) => {
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
        addCourse: async (_root, args) => {
            const teacherData = TeacherModel.findOne({ username: args.teacherUsername });
            const course = new CourseModel({
                ...args,
                teacher: teacherData
            });
            try {
                await course.save();
            }
            catch (error) {
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
const { url } = await startStandaloneServer(server, {
    listen: { port: PORT },
});
console.log(`Server is ready. Go to ${url} for more details.`);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsd0RBQXdEO0FBQ3hELHNEQUFzRDtBQUN0RCwwREFBMEQ7QUFDMUQsdURBQXVEO0FBQ3ZELDREQUE0RDtBQUU1RCxPQUFPLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUU5RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUN2QyxPQUFPLE1BQU0sTUFBTSxlQUFlLENBQUM7QUFDbkMsT0FBTyxNQUFNLE1BQU0sUUFBUSxDQUFDO0FBQzVCLE9BQU8sUUFBUSxNQUFNLFVBQVUsQ0FBQztBQUNoQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUVsRSxRQUFRLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUNuQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFaEIsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztBQUNuQyxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO0FBRXpCLElBQUk7SUFDRixNQUFNLFFBQVEsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsRUFBRSxTQUFTLENBQUMsQ0FBQztDQUNyRDtBQUFDLE9BQU8sS0FBSyxFQUFFO0lBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRSxTQUFTLENBQUMsQ0FBQztDQUMvQztBQUVELE1BQU0sUUFBUSxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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