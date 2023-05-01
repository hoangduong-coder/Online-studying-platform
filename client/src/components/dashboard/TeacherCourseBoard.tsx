import { content, heading } from "@/styles/font"

import { ALL_COURSES } from "@/graphql/course_query"
import ContinueLink from "../widgets/ContinueLink"
import TeacherCourseCard from "../widgets/TeacherCourseCard"
import { useQuery } from "@apollo/client"

const TeacherCourseBoard = ({ id }: { id: string }) => {
  const { loading, error, data } = useQuery(ALL_COURSES, {
    variables: { teacherId: id },
  })
  return (
    <>
      <h2 style={heading.style}>Your own course</h2>
      {loading && <p style={content.style}>Loading, please wait!</p>}
      {error && (
        <p style={content.style}>Something error in loading your course!</p>
      )}
      {data && (
        <div>
          {data.searchCourses.map((obj: any) => (
            <TeacherCourseCard key={obj.id} courseID={obj.id} name={obj.name} />
          ))}
        </div>
      )}
      <ContinueLink url="/profile" title="View more &#8594;" />
    </>
  )
}
export default TeacherCourseBoard
