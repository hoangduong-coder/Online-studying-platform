import { GET_STUDENT_USER, GET_TEACHER_USER } from "@/graphql/query"

import { useQuery } from "@apollo/client"

export const GetUser = (): {
  user?: any
  loading?: string
  error?: string
} => {
  const student = useQuery(GET_STUDENT_USER)
  const teacher = useQuery(GET_TEACHER_USER)
  if (student.data) {
    return {
      user: student.data.getUser
    }
  }
  else if (teacher.data) {
    return {
      user: teacher.data.getUser
    }
  } else if (student.loading || teacher.loading) {
    return {
      loading: "Loading, please wait ..."
    }
  } else {
    return {
      error: "Something went wrong during loading user data! Please try again!"
    }
  }
} 
