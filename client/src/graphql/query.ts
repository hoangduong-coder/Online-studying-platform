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
      role
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
    category
    description
    estimateTime
    id
    name
    teacher {
      email
      name
      organization
      role
      id
    }
    lessons {
      id
    }
  }
}
`