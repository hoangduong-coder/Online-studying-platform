/* eslint-disable react-hooks/rules-of-hooks */

import { ALL_COURSES, GET_COURSE_BASIC, GET_COURSE_FULL } from "./course_query"
import { GET_CURRENT_USER, GET_OTHER_USER_BY_ID } from "./user_query"

import { useQuery } from "@apollo/client"

const getUser = () => {
  const { loading, error, data } = useQuery(GET_CURRENT_USER)
  return { loading, error, user: data?.getUser }
}

const getOtherUser = (userID: any) => {
  const { loading, error, data } = useQuery(GET_OTHER_USER_BY_ID, {
    variables: { userId: userID },
  })
  return { loading, error, user: data?.getOtherUser }
}

const getCourseBasic = (courseID: any) => {
  const { loading, error, data } = useQuery(GET_COURSE_BASIC, {
    variables: { getFullCourseId: courseID },
  })
  return { loading, error, course: data?.getFullCourse }
}

const getCourseFull = (courseID: any) => {
  const { loading, error, data } = useQuery(GET_COURSE_FULL, {
    variables: { getFullCourseId: courseID },
  })
  return { loading, error, course: data?.getFullCourse }
}

const allCourse = () => {
  const { loading, error, data } = useQuery(ALL_COURSES, { pollInterval: 5000 })
  return { loading, error, courseList: data?.allCourses }
}

const getStudentList = () => {
  //code here
}

const getNotification = () => {
  //code here
  //remember ALWAYS REFETCH AFTER 30 SECONDS using poll interval
}

const graphqlQuery = {
  getUser,
  getOtherUser,
  getCourseBasic,
  getCourseFull,
  getStudentList,
  getNotification,
  allCourse,
}

export default graphqlQuery
