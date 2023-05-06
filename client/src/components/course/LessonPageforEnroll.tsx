import { content, heading } from "@/styles/font"

import { GET_COURSE_FULL } from "@/graphql/course_query"
import LessonList from "./LessonList"
import Link from "next/link"
import { useQuery } from "@apollo/client"

const LessonPageforEnroll = ({ courseID }: any) => {
  const { loading, error, data } = useQuery(GET_COURSE_FULL, {
    variables: { getFullCourseId: courseID },
  })
  return (
    <div>
      {loading && (
        <div>
          <p style={content.style}>Loading, please wait ...</p>
        </div>
      )}
      {error && (
        <div>
          <p style={content.style}>{`There is an error`}</p>
        </div>
      )}
      {data && (
        <div className="course">
          <div className="header">
            <h1 style={heading.style}>{data.getFullCourse.name}</h1>
          </div>
          <div className="informationTable">
            <table>
              <tbody>
                <tr>
                  <th style={heading.style}>Categories</th>
                  <td style={content.style}>
                    {data.getFullCourse.category.join(", ")}
                  </td>
                </tr>
                <tr>
                  <th style={heading.style}>Teacher</th>
                  <td style={content.style}>
                    <Link href={`/profile/${data.getFullCourse.teacher.id}`}>
                      {data.getFullCourse.teacher.name}
                    </Link>
                  </td>
                </tr>
                <tr>
                  <th style={heading.style}>Teacher&apos;s email</th>
                  <td style={content.style}>
                    {data.getFullCourse.teacher.email}
                  </td>
                </tr>
                <tr>
                  <th style={heading.style}>Estimated time</th>
                  <td style={content.style}>
                    {data.getFullCourse.estimateTime} hours
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <h2 style={heading.style}>Description</h2>
          <p style={content.style}>{data.getFullCourse.description}</p>
          <div className="lessonList">
            <h2 style={heading.style}>Content</h2>
            <LessonList
              id={courseID}
              list={data.getFullCourse.lessons}
              role="STUDENT"
            />
          </div>
        </div>
      )}
    </div>
  )
}
export default LessonPageforEnroll
