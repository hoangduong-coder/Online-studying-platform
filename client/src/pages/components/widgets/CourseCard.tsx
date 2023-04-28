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
  const { data } = useQuery(GET_COURSE_BY_ID, {
    variables: {
      getCourseByIdId: courseID,
    },
  })
  console.log(data)

  return (
    <div className="courseCard">
      <div className="name">
        {/* <h3 style={heading.style}>{data.getCourseById.name}</h3>
        <p style={content.style}>By {data.getCourseById.teacher.name}</p> */}
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
