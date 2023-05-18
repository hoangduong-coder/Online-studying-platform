import { content, heading } from "@/styles/font"

import Button from "./Button"
import { GET_COURSE_BASIC } from "@/graphql/course_query"
import ProgressPercentage from "./ProgressPercentage"
import { useQuery } from "@apollo/client"

const SmallCourseCard = ({
  courseID,
  percentage,
  status,
}: {
  courseID: string
  percentage?: number
  status?: string
}) => {
  const { error, data } = useQuery(GET_COURSE_BASIC, {
    variables: {
      getFullCourseId: courseID,
    },
  })
  if (!data || error) {
    return <p style={content.style}>No course found!</p>
  }
  return (
    <div className="courseCard">
      <div className="name">
        <h3 style={heading.style}>{data.getFullCourse.name}</h3>
        <p style={content.style}>By {data.getFullCourse.teacher.name}</p>
      </div>
      {percentage && <ProgressPercentage value={Math.round(percentage)} />}
      {status && <ProgressPercentage status={status} />}
      <div>
        <Button title="Continue" link={`/${courseID}`} />
      </div>
    </div>
  )
}

export default SmallCourseCard
