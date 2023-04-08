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
const url = await startStandaloneServer(server, {
    listen: { port: PORT },
});
console.log(`Server is ready. Go to ${url.url} for more details.`);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsd0RBQXdEO0FBQ3hELHNEQUFzRDtBQUN0RCwwREFBMEQ7QUFDMUQsdURBQXVEO0FBQ3ZELDREQUE0RDtBQUU1RCxPQUFPLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFeEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDdkMsT0FBTyxNQUFNLE1BQU0sZUFBZSxDQUFDO0FBQ25DLE9BQU8sTUFBTSxNQUFNLFFBQVEsQ0FBQztBQUM1QixPQUFPLFFBQVEsTUFBTSxVQUFVLENBQUM7QUFDaEMsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFbEUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDbkMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRWhCLE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7QUFDbkMsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztBQUV6QixJQUFJO0lBQ0YsTUFBTSxRQUFRLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLEVBQUUsU0FBUyxDQUFDLENBQUM7Q0FDckQ7QUFBQyxPQUFPLEtBQUssRUFBRTtJQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLEVBQUUsU0FBUyxDQUFDLENBQUM7Q0FDL0M7QUFFRCxNQUFNLFFBQVEsR0FBRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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