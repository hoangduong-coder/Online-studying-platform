import { content, heading } from "@/styles/font"

import Button from "./Button"
import { GET_COURSE_BY_ID } from "@/graphql/query"
import ProgressPercentage from "./ProgressPercentage"
import { useQuery } from "@apollo/client"

const CourseCard = ({
  courseID,
  percentage,
}: {
  courseID: string
  percentage: number
}) => {
  const course = useQuery(GET_COURSE_BY_ID, {
    variables: {
      id: courseID,
    },
  })
  if (!course) {
    return (
      <div>
        <p style={content.style}>No courses found!</p>
      </div>
    )
  }
  return (
    <div className="courseCard">
      <div className="name">
        <h3 style={heading.style}>{course.data.name}</h3>
        <p style={content.style}>By {course.data.teacher.name}</p>
      </div>
      <div>
        <ProgressPercentage value={Math.round(percentage)} />
      </div>
      <div>
        <Button title="Continue" />
      </div>
    </div>
  )
}

export default CourseCard
