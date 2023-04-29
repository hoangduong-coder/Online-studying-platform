import { GET_STUDENT } from "@/graphql/query"
import { LinearProgress } from "@mui/material"
import { content } from "@/styles/font"
import { useQuery } from "@apollo/client"
import { useState } from "react"

const LinearProgressBar = ({ courseID }: { courseID: any }) => {
  const { loading, error, data } = useQuery(GET_STUDENT)
  const [value, setValue] = useState<number>(0)
  if (loading) {
    return <p style={content.style}>Loading, please wait...</p>
  }
  if (error) {
    return <p style={content.style}>No result found! Try again!</p>
  }
  if (
    data.getStudent.studyProgress.find((obj: any) => obj.course.id === courseID)
  ) {
    setValue(
      data.getStudent.studyProgress.find(
        (obj: any) => obj.course.id === courseID
      ).progressPercentage
    )
  }
  return (
    <div className="linearProgress">
      <LinearProgress value={value} variant="determinate" />
      <p style={content.style}>{`${Math.round(value)}%`}</p>
    </div>
  )
}
export default LinearProgressBar
