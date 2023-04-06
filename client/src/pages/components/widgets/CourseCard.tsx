import { content, heading } from "@/styles/font"

import Button from "./Button"
import ProgressPercentage from "./ProgressPercentage"

const CourseCard = () => {
  return (
    <div className="courseCard">
      <div className="name">
        <h3 style={heading.style}>React.JS Fundamentals</h3>
        <p style={content.style}>By John Doe</p>
      </div>
      <div>
        <ProgressPercentage value={70} />
      </div>
      <div>
        <Button title="Continue" />
      </div>
    </div>
  )
}

export default CourseCard
