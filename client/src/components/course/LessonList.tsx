import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material"

import ContinueLink from "@/components/widgets/ContinueLink"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { heading } from "@/styles/font"

const LessonList = ({ id, list }: { id: any; list: any[] }) => {
  return (
    <div>
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
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  )
}
export default LessonList
