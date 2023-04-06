import ContinueLink from "../widgets/ContinueLink"
import NewCourseCard from "./NewCourseCard"
import { heading } from "@/styles/font"

const SuggestedCourses = () => {
  return (
    <div className="suggestedCourses">
      <h2 style={heading.style}>More courses for you</h2>
      <div className="list">
        <NewCourseCard />
        <NewCourseCard />
      </div>
      <ContinueLink url="/categories" title="View more &#8594;" />
    </div>
  )
}

export default SuggestedCourses
