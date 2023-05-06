import BigCourseCard from "../widgets/BigCourseCard"
import ContinueLink from "../widgets/ContinueLink"
import { heading } from "@/styles/font"

const TeacherCourseBoard = ({ ownCourses }: { ownCourses: any[] }) => {
  return (
    <div>
      {ownCourses.map((obj: any) => (
        <BigCourseCard
          key={obj.id}
          id={obj.id}
          name={obj.name}
          category={obj.category}
          estimateTime={obj.estimateTime}
        />
      ))}
    </div>
  )
}
export default TeacherCourseBoard
