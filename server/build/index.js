import { ApolloServer } from '@apollo/server';
import CourseModels from "models/Course";
import { GraphQLError } from "graphql";
import StudentModels from 'models/Student';
import TeacherModels from 'models/Teacher';
import config from "config";
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
        allCourses: async (_root, args) => {
            if (args.name) {
                return CourseModels.find({ name: { $in: args.name } });
            }
            else if (args.category) {
                return CourseModels.find({ category: { $in: args.category } });
            }
            return CourseModels.find({});
        },
        getCourseById: async (_root, args) => {
            return CourseModels.find({ _id: args.id });
        }
    },
    EnrolledStudent: {
        student: async (parent) => {
            return StudentModels.findOne({ _id: parent.student.id });
        }
    },
    Course: {
        teacher: async (parent) => {
            return TeacherModels.findOne({ _id: parent.teacher.id });
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
            const teacherData = TeacherModels.findOne({ username: args.teacherUsername });
            const course = new CourseModels({
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFBO0FBQzdDLE9BQU8sWUFBWSxNQUFNLGVBQWUsQ0FBQTtBQUN4QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sU0FBUyxDQUFBO0FBQ3RDLE9BQU8sYUFBYSxNQUFNLGdCQUFnQixDQUFBO0FBQzFDLE9BQU8sYUFBYSxNQUFNLGdCQUFnQixDQUFBO0FBQzFDLE9BQU8sTUFBTSxNQUFNLFFBQVEsQ0FBQTtBQUMzQixPQUFPLE1BQU0sTUFBTSxRQUFRLENBQUE7QUFDM0IsT0FBTyxRQUFRLE1BQU0sVUFBVSxDQUFBO0FBQy9CLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFBO0FBRWpFLFFBQVEsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxDQUFBO0FBQ2xDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQTtBQUVmLE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUE7QUFDbEMsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQTtBQUV4QixJQUFJO0lBQ0YsTUFBTSxRQUFRLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQ2pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLEVBQUUsU0FBUyxDQUFDLENBQUE7Q0FDcEQ7QUFBQyxPQUFPLEtBQUssRUFBRTtJQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLEVBQUUsU0FBUyxDQUFDLENBQUE7Q0FDOUM7QUFFRCxNQUFNLFFBQVEsR0FBRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBdUZoQixDQUFBO0FBQ0QsTUFB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