import { content, heading } from "@/styles/font"

import Button from "./Button"
import { GET_COURSE_BY_ID } from "@/graphql/query"
import ProgressPercentage from "./ProgressPercentage"
import { useQuery } from "@apollo/client"

const TeacherCourseCard = ({
  courseID,
  name,
}: {
  courseID: string
  name: string
}) => {
  return (
    <div className="courseCard">
      <div className="name">
        <h3 style={heading.style}>{name}</h3>
      </div>
      <div>
        <Button title="Continue" link={`/${courseID}`} />
      </div>
    </div>
  )
}

export default TeacherCourseCard
