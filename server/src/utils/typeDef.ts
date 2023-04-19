const typeDefs = `#graphql
  enum Status {
    PASSED
    FAILED
    ONGOING
  }

  type EnrolledStudent {
    student: User!
    status: Status!
    overall: Int
    finishedDate: String
    progress: Float
  }
  
  enum Role {
    TEACHER
    STUDENT
  }

  type User {
    id: ID!
    name: String!
    email: String!
    passwordHash: String!
    organization: String
    role: Role!
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
    teacher: User!
    students: [EnrolledStudent!]
    description: String!
    lessons: [Lesson!]
    
    # calculate in hours
    estimateTime: Float
  }

  type Query {
    allCourses(name: String, category: String): [Course!]
    getCourseById(id: ID!): Course!
    getTeacherCourses(teacherID: ID!): [Course!]
    getLesson(id: ID!): Lesson!
    me: User
  }

  type Mutation {
    enrollCourse(courseID: ID!): EnrolledStudent
    createUser(
      name: String!, 
      email: String!, 
      organization: String,
      password: String!
      role: Role!
    ): User
    addCourse(
      name: String!, 
      category: [String!]!, 
      teacherID: ID!, 
      description: String!,
      estimateTime: Float
    ): Course,
    login(email: String!, password: String!): String!
    answerQuiz(quizID: ID!, answer: String!): String!
  }
`;

export default typeDefs;
