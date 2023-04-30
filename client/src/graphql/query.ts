import { BASIC_DETAILS } from "./query_fragment"
import { gql } from "@apollo/client"

export const LOGIN = gql`
  mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`

export const GET_STUDENT_USER = gql`
  query Query {
    getUser {
      ...BasicDetails
      studyProgress {
        course {
          id
        }
        status
        overallPoint
        finishedDate
        progressPercentage
      }
    }
  }
  ${BASIC_DETAILS}
`

export const GET_TEACHER_USER = gql`
  query Query {
    getUser {
      ...BasicDetails
      organization
    }
  }
  ${BASIC_DETAILS}
`

export const GET_COURSE_BY_ID = gql`
query Query($getCourseByIdId: ID!) {
  getCourseById(id: $getCourseByIdId) {
    id
    name
    category
    teacher {
      ...BasicDetails
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
${BASIC_DETAILS}
`
export const GET_OTHER_TEACHER_BY_ID = gql`
query Query($userId: ID!) {
  getTeacher(userID: $userId) {
    name
    email
    organization
    role
  }
}
`

export const ENROLL_COURSE = gql`
mutation Mutation($courseId: ID!) {
  enrollCourse(courseID: $courseId)
}
`
export const ALL_COURSES = gql`
query SearchCourses($teacherId: ID!, $category: String, $name: String) {
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
mutation Mutation($courseId: ID!, $lessonId: ID!, $answers: [StudentAnswer!]!) {
  answerQuiz(courseID: $courseId, lessonID: $lessonId, answers: $answers)
}
`