import { gql } from "@apollo/client"

export const LOGIN = gql`
  mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`

export const GET_STUDENT = gql`
  query Query {
    getStudent {
      email
      id
      name
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
  }`

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
      organization
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
export const GET_TEACHER_BY_ID = gql`
query Query($userId: ID!) {
  getTeacher(userID: $userId) {
    name
    email
    organization
    role
  }
}
`