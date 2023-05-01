import ContinueLink from "../widgets/ContinueLink"
import CourseCard from "../widgets/CourseCard"
import { heading } from "@/styles/font"

const StudentCourseBoard = ({ studyProgress }: { studyProgress: any[] }) => {
  return (
    <>
      <h2 style={heading.style}>Ready to jump back on?</h2>
      <div>
        {studyProgress.map(
          (obj: any) =>
            obj.status === "ONGOING" && (
              <CourseCard
                key={obj.course.id}
                courseID={obj.course.id}
                percentage={obj.progressPercentage}
              />
            )
        )}
      </div>
      <ContinueLink url="/profile" title="View more &#8594;" />
    </>
  )
}
export default StudentCourseBoard
