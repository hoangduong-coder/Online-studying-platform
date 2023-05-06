import { gql } from "@apollo/client"

export const SIGN_UP = gql`
  mutation Mutation(
    $name: String!
    $email: String!
    $password: String!
    $organization: String
  ) {
    createUser(
      name: $name
      email: $email
      password: $password
      organization: $organization
    ) {
      ... on Student {
        email
        id
        name
      }
      ... on Teacher {
        email
        id
        name
        organization
      }
    }
  }
`

export const LOGIN = gql`
  mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`

export const GET_CURRENT_USER = gql`
  query Query {
    getUser {
      __typename
      ... on Student {
        studyProgress {
          course {
            id
          }
          status
          overallPoint
          finishedDate
          progressPercentage
        }
        id
        name
        email
      }
      ... on Teacher {
        organization
        id
        name
        email
        ownCourses {
          id
          name
          category
          estimateTime
        }
      }
    }
  }
`
export const GET_OTHER_USER_BY_ID = gql`
  query Query($userId: ID!) {
    getOtherTeacher(userID: $userId) {
      __typename
      ... on Student {
        id
        name
        email
      }
      ... on Teacher {
        organization
        id
        name
        email
        ownCourses {
          id
          name
          category
          estimateTime
        }
      }
    }
  }
`
