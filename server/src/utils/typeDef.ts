const typeDefs = `#graphql
  enum Status {
    PASSED
    FAILED
    ONGOING
  }

  type StudyProgress {
    student: Student
    course: Course!
    startDate: String!
    status: Status!
    overallPoint: Float
    finishedDate: String
    progressPercentage: Float!
    lessonCompleted: [LessonCompleted!]
  }

  type Comment {
    quizID: String!
    answer: String!
    comment: String!
  }

  type LessonCompleted {
    lesson: Lesson!
    point: Float!
    comments: [Comment!]
  }

  type Teacher {
    id: ID!
    name: String!
    email: String!
    passwordHash: String!
    organization: String
    ownCourses: [Course!]
  }

  type Student {
    id: ID!
    name: String!
    email: String!
    passwordHash: String!
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
    lessons: [Lesson]
    estimateTime: Float
    students: [StudyProgress!]
  }

  union User = Student | Teacher

  type Query {
    getUser: User
    getOtherUser(userID: ID!): User
    allCourses: [Course!]
    getFullCourse(id: ID!): Course
    getQuizResult(courseID: ID!, lessonID: ID!): LessonCompleted
    getOverallResult(courseID: ID!): StudyProgress
  }

  type Mutation {
    enrollCourse(courseID: ID!): String
    createUser(
      name: String!, 
      email: String!, 
      password: String!, 
      organization: String
    ): User
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
    answerQuiz(courseID: ID!, lessonID: ID!, answers: [StudentAnswer!]!): LessonCompleted
    login(email: String!, password: String!): String!
  }
`;
export default typeDefs;

//  deleteQuiz(
// lessonID: ID!,
//   quizID: ID!
//     ): String