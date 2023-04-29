import { content, heading } from "@/styles/font"

import { AccessTimeFilled } from "@mui/icons-material"
import ContinueLink from "../widgets/ContinueLink"

const NewCourseCard = ({ id, name, teacher, category, estimateTime }: any) => {
  return (
    <div className="newCourseCard">
      <h3 style={heading.style}>{name}</h3>
      <p style={content.style}>By {teacher.name}</p>
      <div className="timing">
        <AccessTimeFilled />
        <p style={content.style}>{estimateTime} hours</p>
      </div>
      <div className="keyword">
        {
          //@ts-ignore
          category.map((obj) => (
            <p style={content.style} key={obj} className="card">
              {obj}
            </p>
          ))
        }
      </div>
      <ContinueLink url={`/${id}`} title="More info &#8594;" />
    </div>
  )
}

export default NewCourseCard
