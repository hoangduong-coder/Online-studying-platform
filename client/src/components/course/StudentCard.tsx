import { content, heading } from "@/styles/font"

import ProgressPercentage from "../widgets/ProgressPercentage"
import { formatDate } from "@/helper/formatDate"

const StudentCard = ({
  name,
  startDate,
  finishDate,
  percentage,
  status,
}: any) => {
  return (
    <div className="studentCard">
      <div className="name">
        <h3 style={heading.style}>{name}</h3>
        {startDate && <p style={content.style}>From {formatDate(startDate)}</p>}
        {finishDate && (
          <p style={content.style}>Finished on {formatDate(finishDate)}</p>
        )}
        {percentage && percentage === 0 && (
          <p style={content.style}>No progress made.</p>
        )}
      </div>
      {percentage && percentage > 0 && (
        <ProgressPercentage value={Math.round(percentage)} />
      )}
      {status && <ProgressPercentage status={status} />}
    </div>
  )
}

export default StudentCard
