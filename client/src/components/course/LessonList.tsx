import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material"

import Button from "../widgets/Button"
import ContinueLink from "@/components/widgets/ContinueLink"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { heading } from "@/styles/font"

const LessonList = ({
  id,
  list,
  role,
}: {
  id: any
  list: any[]
  role: string
}) => {
  return (
    <div>
      {role === "TEACHER" && (
        <div className="buttonForm">
          <Button link={`/${id}/contentform`} title="Add new lesson" />
        </div>
      )}
      {list.map((obj: any, index: number) => (
        <Accordion key={obj.id}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <h3 style={heading.style}>{`${index + 1}. ${obj.title}`}</h3>
          </AccordionSummary>
          <AccordionDetails>
            <ContinueLink
              url={`/${id}/${obj.id}?which=content`}
              title="View content"
            />
            {obj.quiz.length > 0 && (
              <ContinueLink
                url={`/${id}/${obj.id}?which=quiz`}
                title="Go to quiz"
              />
            )}
            {role === "TEACHER" && (
              <div className="buttonForm">
                <Button
                  link={`${id}/${obj.id}/quizform`}
                  title="Add another quiz"
                />
              </div>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  )
}
export default LessonList
