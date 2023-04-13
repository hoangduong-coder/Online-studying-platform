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
    name: String!
    username: String!
    email: String!
    passwordHash: String!
  }

  type Teacher {
    id: ID!
    name: String!
    username: String!
    email: String!
    organization: String
    passwordHash: String!
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

  type Token {
    value: String!
  }

  union User = Student | Teacher


  type Query {
    allCourses(name: String, category: String): [Course!]
    getCourseById(id: ID!): Course!
    getLesson(id: ID!): Lesson!
    me: User
  }

  type Mutation {
    enrollCourse(studentID: ID!, courseID: ID!): EnrolledStudent
    createStudent(name: String!, email: String!, username: String!): Student
    createTeacher(
      name: String!, 
      email: String!, 
      username: String!, 
      organization: String!
    ): Teacher
    addCourse(
      name: String!, 
      category: [String!]!, 
      teacherUsername: String!, 
      description: String!,
      estimateTime: Float
    ): Course,
    login(username: String!, password: String!): Token
  }
`;

export default typeDefs;
