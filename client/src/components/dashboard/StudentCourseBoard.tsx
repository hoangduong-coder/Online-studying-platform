import { Box } from "@mui/material"
import ContinueLink from "../widgets/ContinueLink"
import SmallCourseCard from "../widgets/SmallCourseCard"
import { heading } from "@/styles/font"

const StudentCourseBoard = ({ studyProgress }: { studyProgress: any[] }) => {
  return (
    <>
      <h2 style={heading.style}>Ready to jump back on?</h2>
      <div>
        {studyProgress.map(
          (obj: any) =>
            obj.status === "ONGOING" && (
              <SmallCourseCard
                key={obj.course.id}
                courseID={obj.course.id}
                percentage={obj.progressPercentage}
              />
            )
        )}
      </div>
      <Box sx={{ width: "100%" }}>
        <ContinueLink url="/profile/myprofile" title="View more &#8594;" />
      </Box>
    </>
  )
}
export default StudentCourseBoard
