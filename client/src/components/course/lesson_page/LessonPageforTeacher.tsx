import { GET_COURSE_BASIC, GET_COURSE_FULL } from "@/graphql/course_query"
import { content, heading } from "@/styles/font"

import LessonList from "../LessonList"
import Link from "next/link"
import StudentList from "../StudentList"
import { useQuery } from "@apollo/client"

const LessonPageforTeacher = ({ courseID, teacherData }: any) => {
  const { loading, error, data } = useQuery(
    //@ts-ignore
    teacherData.ownCourses.find((obj) => obj.id === courseID)
      ? GET_COURSE_FULL
      : GET_COURSE_BASIC,
    {
      variables: { getFullCourseId: courseID },
    }
  )
  return (
    <div className="course">
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
        <>
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
            {!data.getFullCourse.lessons ? (
              <>
                <h2 style={heading.style}>Content</h2>
                <p style={content.style}>You cannot view this course content</p>
              </>
            ) : (
              <>
                <StudentList list={data.getFullCourse.students} />
                <h2 style={heading.style}>Content</h2>
                <LessonList
                  id={courseID}
                  list={data.getFullCourse.lessons}
                  role="TEACHER"
                />
              </>
            )}
          </div>
        </>
      )}
    </div>
  )
}
export default LessonPageforTeacher
