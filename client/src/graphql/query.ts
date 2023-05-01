import { gql } from "@apollo/client"

export const LOGIN = gql`
  mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`

export const GET_USER = gql`
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
      }
    }
  }
`

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
export const GET_OTHER_TEACHER_BY_ID = gql`
  query Query($userId: ID!) {
    getTeacher(userID: $userId) {
      name
      email
      organization
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
