import { content, heading } from "@/styles/font"

import { AccessTimeFilled } from "@mui/icons-material"
import ContinueLink from "../widgets/ContinueLink"

const NewCourseCard = () => {
  return (
    <div className="newCourseCard">
      <h3 style={heading.style}>Data Analysis with Python</h3>
      <p style={content.style}>By Micheal Grey</p>
      <div className="timing">
        <AccessTimeFilled />
        <p style={content.style}>48h 30mins</p>
      </div>
      <div className="keyword">
        <p style={content.style} className="card">
          Data analysis
        </p>
        <p style={content.style} className="card">
          Python
        </p>
        <p style={content.style} className="card">
          Numpy
        </p>
      </div>
      <ContinueLink url="/" title="More info &#8594;" />
    </div>
  )
}

export default NewCourseCard
