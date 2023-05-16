import { content, heading } from "@/styles/font"

import { GET_OVERALL_RESULT } from "@/graphql/course_query"
import moment from "moment"
import { useQuery } from "@apollo/client"

const CongratulationCard = ({ courseID, teacher }: any) => {
  const fetchResult = useQuery(GET_OVERALL_RESULT, {
    variables: { courseId: courseID },
  })
  if (!fetchResult.data) {
    return <p style={content.style}>Wait for processing....</p>
  }
  return (
    <>
      {fetchResult.data.getOverallResult.status === "PASSED" && (
        <div className="passedMessage">
          <h1 style={heading.style}>
            Congratulations. You have finished the course!
          </h1>
          <h3 style={heading.style}>
            Your overall point is:{" "}
            {fetchResult.data.getOverallResult.overallPoint.toFixed(1)}/10
          </h3>
          <div className="footer">
            <div className="signature">
              <p style={content.style}>{moment().format("DD.MM.YY")}</p>
              <h3 style={heading.style}>{teacher.name}</h3>
            </div>
          </div>
        </div>
      )}
      {fetchResult.data.getOverallResult.status === "FAILED" && (
        <div className="failedMessage">
          <h1 style={heading.style}>You have finished the course!</h1>
          <h3 style={heading.style}>
            Your overall point is:{" "}
            {fetchResult.data.getOverallResult.overallPoint.toFixed(1)}/10
          </h3>
        </div>
      )}
    </>
  )
}

export default CongratulationCard
