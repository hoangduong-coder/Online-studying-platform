import {
  ENROLL_COURSE,
  GET_COURSE_BY_ID,
  GET_OVERALL_RESULT,
} from "@/graphql/query"
import { content, heading } from "@/styles/font"
import { useMutation, useQuery } from "@apollo/client"

import CongratulationCard from "./Congratulation"
import Head from "next/head"
import LessonList from "./LessonList"
import Link from "next/link"
import { useRouter } from "next/router"

export default function Course() {
  const router = useRouter()
  const { courseID } = router.query
  const { loading, error, data } = useQuery(GET_COURSE_BY_ID, {
    variables: { getCourseByIdId: courseID },
  })
  const [enrollCourse] = useMutation(ENROLL_COURSE, {
    refetchQueries: [
      { query: GET_COURSE_BY_ID, variables: { getCourseByIdId: courseID } },
    ],
    onError: (error) =>
      alert(
        `Enrollment failed, due to error ${error.graphQLErrors[0].message}`
      ),
    onCompleted: (mess) => {
      alert(`${mess.enrollCourse}`)
    },
  })
  return (
    <>
      <Head>
        <title>View course | HD learning platform</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        {loading && (
          <div>
            <p style={content.style}>Loading, please wait ...</p>
          </div>
        )}
        {error && (
          <div>
            <p style={content.style}>{`There is an error: ${error.message}`}</p>
          </div>
        )}
        {data && (
          <div className="course">
            <div className="header">
              <h1 style={heading.style}>{data.getCourseById.name}</h1>
            </div>
            <div className="informationTable">
              <table>
                <tbody>
                  <tr>
                    <th style={heading.style}>Categories</th>
                    <td style={content.style}>
                      {data.getCourseById.category.join(", ")}
                    </td>
                  </tr>
                  <tr>
                    <th style={heading.style}>Teacher</th>
                    <td style={content.style}>
                      <Link href={`/profile/${data.getCourseById.teacher.id}`}>
                        {data.getCourseById.teacher.name}
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <th style={heading.style}>Teacher&apos;s email</th>
                    <td style={content.style}>
                      {data.getCourseById.teacher.email}
                    </td>
                  </tr>
                  <tr>
                    <th style={heading.style}>Estimated time</th>
                    <td style={content.style}>
                      {data.getCourseById.estimateTime} hours
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <h2 style={heading.style}>Description</h2>
            <p style={content.style}>{data.getCourseById.description}</p>
            <div className="lessonList">
              {!data.getCourseById.lessons ? (
                <button
                  className="button"
                  onClick={(e) => {
                    e.preventDefault()
                    enrollCourse({ variables: { courseId: courseID } })
                  }}
                >
                  <span style={content.style}>Enroll</span>
                </button>
              ) : (
                <>
                  <h2 style={heading.style}>Content</h2>
                  <LessonList id={courseID} list={data.getCourseById.lessons} />
                </>
              )}
            </div>
            <CongratulationCard courseID={courseID} />
          </div>
        )}
      </div>
    </>
  )
}
