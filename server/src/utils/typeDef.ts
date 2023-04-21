const typeDefs = `#graphql
  enum Status {
    PASSED
    FAILED
    ONGOING
  }

  type StudyProgress {
    course: Course!
    status: Status!
    overall: Int
    finishedDate: String
    progress: Float
  }
  
  enum Role {
    TEACHER
    STUDENT
  }

  type Teacher {
    id: ID!
    name: String!
    email: String!
    passwordHash: String!
    organization: String
    role: Role!
  }

  type Student {
    id: ID!
    name: String!
    email: String!
    passwordHash: String!
    role: Role!
    studyProgress: [StudyProgress!]
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
    description: String!
    lessons: [Lesson!]
    
    # calculate in hours
    estimateTime: Float
  }

  type StudentAnswer {
    quizID: ID!
    answer: String!
  }

  type Query {
    allCourses(name: String, category: String): [Course!]
    getCourseById(id: ID!): Course!
    getTeacherCourses(teacherID: ID!): [Course!]
    getLesson(id: ID!): Lesson!
  }

  type Mutation {
    enrollCourse(courseID: ID!): EnrolledStudent
    createStudent(
      name: String!, 
      email: String!, 
      password: String!
    ): Student
    createTeacher(
      name: String!, 
      email: String!, 
      organization: String,
      password: String!
    ): Student
    addCourse(
      name: String!, 
      category: [String!]!, 
      teacherID: ID!, 
      description: String!,
      estimateTime: Float
    ): Course
    updateProfile(name: String, email: String, courseID: ID, lessonID: ID, answers: [StudentAnswer!]): User!
    login(email: String!, password: String!): String!
  }
`;

export default typeDefs;
