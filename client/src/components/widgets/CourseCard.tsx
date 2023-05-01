import { content, heading } from "@/styles/font"

import Button from "./Button"
import { GET_COURSE_BY_ID } from "@/graphql/course_query"
import ProgressPercentage from "./ProgressPercentage"
import { useQuery } from "@apollo/client"

const CourseCard = ({
  courseID,
  percentage,
  status,
}: {
  courseID: string
  percentage?: number
  status?: string
}) => {
  const { error, data } = useQuery(GET_COURSE_BY_ID, {
    variables: {
      getCourseByIdId: courseID,
    },
  })
  if (!data || error) {
    return <p style={content.style}>No course found!</p>
  }
  return (
    <div className="courseCard">
      <div className="name">
        <h3 style={heading.style}>{data.getCourseById.name}</h3>
        <p style={content.style}>By {data.getCourseById.teacher.name}</p>
      </div>
      <div>
        {percentage && <ProgressPercentage value={Math.round(percentage)} />}
        {status && <ProgressPercentage status={status} />}
      </div>
      <div>
        <Button title="Continue" link={`/${courseID}`} />
      </div>
    </div>
  )
}

export default CourseCard
