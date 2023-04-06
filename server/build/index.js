import { ApolloServer } from '@apollo/server';
import CourseModels from './models/course';
import { GraphQLError } from "graphql";
import StudentModels from './models/student';
import TeacherModels from './models/teacher';
import config from "./config";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFBO0FBQzdDLE9BQU8sWUFBWSxNQUFNLGlCQUFpQixDQUFBO0FBQzFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxTQUFTLENBQUE7QUFDdEMsT0FBTyxhQUFhLE1BQU0sa0JBQWtCLENBQUE7QUFDNUMsT0FBTyxhQUFhLE1BQU0sa0JBQWtCLENBQUE7QUFDNUMsT0FBTyxNQUFNLE1BQU0sVUFBVSxDQUFBO0FBQzdCLE9BQU8sTUFBTSxNQUFNLFFBQVEsQ0FBQTtBQUMzQixPQUFPLFFBQVEsTUFBTSxVQUFVLENBQUE7QUFDL0IsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUE7QUFFakUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUE7QUFDbEMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFBO0FBRWYsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQTtBQUNsQyxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFBO0FBRXhCLElBQUk7SUFDRixNQUFNLFFBQVEsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUE7SUFDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsRUFBRSxTQUFTLENBQUMsQ0FBQTtDQUNwRDtBQUFDLE9BQU8sS0FBSyxFQUFFO0lBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRSxTQUFTLENBQUMsQ0FBQTtDQUM5QztBQUVELE1BQU0sUUFBUSxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0F1RmhCLENBQUE7QUFDRCxN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