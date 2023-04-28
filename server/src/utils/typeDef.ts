const typeDefs = `#graphql
  enum Status {
    PASSED
    FAILED
    ONGOING
  }

  type StudyProgress {
    course: Course!
    status: Status!
    overallPoint: Int
    finishedDate: String
    progressPercentage: Float!
    lessonCompleted: [LessonCompleted!]
  }

  type Comment {
    quiz: Quiz!
    answer: String!
    comment: String!
  }

  type LessonCompleted {
    lesson: Lesson!
    point: Float!
    comments: [Comment!]
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
    content: String!
    quiz: [Quiz!]
  }

  type Quiz {
    id: ID!
    question: String!
    choices: [String!]
    answer: String!
  }

  input StudentAnswer {
    quizID: ID!
    answer: String!
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

  type Query {
    getStudent: Student
    getTeacher(userID: ID!): Teacher
    allCourses(name: String, category: String): [Course!]
    getCourseById(id: ID!): Course!
    getUserCourses(userID: ID!): [Course!]
    getOverallResult(courseID: ID!): Float
  }

  type Mutation {
    enrollCourse(courseID: ID!): String
    createStudent(name: String!, email: String!, password: String!): Student
    createTeacher(
      name: String!, 
      email: String!, 
      organization: String,
      password: String!
    ): Teacher
    addCourse(
      name: String!, 
      category: [String!]!, 
      teacherID: ID!, 
      description: String!,
      estimateTime: Float
    ): Course
    addLesson(courseID: ID!, title: String!, content: String!): Lesson
    addQuiz(
      lessonID: ID!,
      question: String!,
      choices: [String!],
      answer: String!
    ): Quiz
    answerQuiz(courseID: ID!, lessonID: ID!, answers: [StudentAnswer!]!): Float
    login(email: String!, password: String!): String!
  }
`;
export default typeDefs;
