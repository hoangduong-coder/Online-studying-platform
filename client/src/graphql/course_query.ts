import { gql } from "@apollo/client"

export const GET_COURSE_BASIC = gql`
  query Query($getFullCourseId: ID!) {
    getFullCourse(id: $getFullCourseId) {
      id
      name
      category
      teacher {
        id
        name
        email
      }
      description
      estimateTime
    }
  }
`

export const GET_COURSE_FULL = gql`
  query Query($getFullCourseId: ID!) {
    getFullCourse(id: $getFullCourseId) {
      id
      name
      category
      teacher {
        id
        name
        email
      }
      description
      estimateTime
      lessons {
        id
        title
        content
        quiz {
          id
          question
          choices
          answer
        }
      }
      students {
        student {
          name
          id
        }
        startDate
        finishedDate
        status
        progressPercentage
      }
    }
  }
`

export const ENROLL_COURSE = gql`
  mutation Mutation($courseId: ID!) {
    enrollCourse(courseID: $courseId)
  }
`
export const ALL_COURSES = gql`
  query Query {
    allCourses {
      id
      name
      category
      teacher {
        id
        name
      }
      description
      estimateTime
    }
  }
`

export const ANSWER_QUIZ = gql`
  mutation Mutation(
    $courseId: ID!
    $lessonId: ID!
    $answers: [StudentAnswer!]!
  ) {
    answerQuiz(courseID: $courseId, lessonID: $lessonId, answers: $answers) {
      comments {
        answer
        comment
        quizID
      }
      point
    }
  }
`

export const GET_QUIZ_RESULT = gql`
  query GetQuizResult($courseId: ID!, $lessonId: ID!) {
    getQuizResult(courseID: $courseId, lessonID: $lessonId) {
      comments {
        quizID
        answer
        comment
      }
      point
    }
  }
`

export const GET_OVERALL_RESULT = gql`
  query GetOverallResult($courseId: ID!) {
    getOverallResult(courseID: $courseId) {
      status
      progressPercentage
      overallPoint
      finishedDate
    }
  }
`
export const ADD_COURSE = gql`
  mutation Mutation(
    $name: String!
    $category: [String!]!
    $teacherId: ID!
    $description: String!
    $estimateTime: Float
  ) {
    addCourse(
      name: $name
      category: $category
      teacherID: $teacherId
      description: $description
      estimateTime: $estimateTime
    ) {
      id
    }
  }
`

export const ADD_LESSON = gql`
  mutation Mutation($courseId: ID!, $title: String!, $content: String!) {
    addLesson(courseID: $courseId, title: $title, content: $content) {
      id
    }
  }
`

export const ADD_QUIZ = gql`
  mutation Mutation(
    $lessonId: ID!
    $question: String!
    $answer: String!
    $choices: [String!]
  ) {
    addQuiz(
      lessonID: $lessonId
      question: $question
      answer: $answer
      choices: $choices
    ) {
      id
    }
  }
`
