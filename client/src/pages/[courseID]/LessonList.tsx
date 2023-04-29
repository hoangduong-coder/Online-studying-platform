import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material"

import ContinueLink from "../components/widgets/ContinueLink"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

const LessonList = ({ id, list }: { id: any; list: any[] }) => {
  return (
    <div>
      {list.map((obj: any, index: number) => (
        <Accordion key={obj.id}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{`${index + 1}. ${obj.title}`}</Typography>
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
