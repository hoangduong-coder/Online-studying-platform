import { content, heading } from "@/styles/font"

import ProgressPercentage from "../widgets/ProgressPercentage"
import moment from "moment"

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
        {startDate && (
          <p style={content.style}>
            From {moment(startDate).format("DD.MM.YYYY")}
          </p>
        )}
        {finishDate && (
          <p style={content.style}>
            Finished on {moment(finishDate).format("DD.MM.YYYY")}
          </p>
        )}
      </div>
      {percentage && <ProgressPercentage value={Math.round(percentage)} />}
      {status && <ProgressPercentage status={status} />}
    </div>
  )
}

export default StudentCard
