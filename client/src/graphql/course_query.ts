import { gql } from "@apollo/client"

export const GET_COURSE_BY_ID = gql`
  query Query($getCourseByIdId: ID!) {
    getCourseById(id: $getCourseByIdId) {
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
        }
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
  query SearchCourses($teacherId: ID, $category: String, $name: String) {
    searchCourses(teacherID: $teacherId, category: $category, name: $name) {
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
      lesson {
        id
      }
      point
    }
  }
`

export const GET_OVERALL_RESULT = gql`
  query GetOverallResult($courseId: ID!) {
    getOverallResult(courseID: $courseId) {
      lessonCompleted {
        comments {
          answer
          comment
          quizID
        }
        lesson {
          id
        }
        point
      }
      status
      progressPercentage
      overallPoint
      finishedDate
    }
  }
`
export const ADD_COURSE = gql`
mutation Mutation($name: String!, $category: [String!]!, $teacherId: ID!, $description: String!, $estimateTime: Float) {
  addCourse(name: $name, category: $category, teacherID: $teacherId, description: $description, estimateTime: $estimateTime) {
    id
  }
}`