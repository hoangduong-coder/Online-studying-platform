import { content, heading } from "@/styles/font"

import { TextField } from "@mui/material"
import { htmlcodeConverter } from "@/helper/htmlCodeConverter"

const returnResult = (quizList: any[], quizID: any) => {
  return quizList.find((obj: any) => obj.id === quizID)
}

const CompletedQuiz = ({
  result,
  quizzes,
  point,
}: {
  result: any[]
  quizzes: any[]
  point: any
}) => {
  return (
    <div>
      <div className="point">
        <h3 style={heading.style}>Your final point is {point.toFixed(1)}/10</h3>
      </div>
      {result.map((obj) => (
        <div key={obj.quizID}>
          <div className="quiz">
            <h3 style={heading.style}>
              {returnResult(quizzes, obj.quizID).question}
            </h3>
            {returnResult(quizzes, obj.quizID).choices.length === 0 ? (
              <TextField
                style={content.style}
                name={obj.quizID}
                value={obj.answer}
                color="warning"
                disabled={true}
                fullWidth
                size="small"
              />
            ) : (
              <>
                {returnResult(quizzes, obj.quizID).choices.map(
                  (choice: any) => (
                    <div key={choice}>
                      <input
                        type="radio"
                        id="choices"
                        value={choice}
                        name="choice"
                        disabled
                      />
                      <label htmlFor={choice} style={content.style}>
                        {htmlcodeConverter(choice)}
                      </label>
                    </div>
                  )
                )}
              </>
            )}
          </div>
          <div className="comment">
            {obj.answer.length > 0 && (
              <h3 style={heading.style}>
                Your replied answer: {htmlcodeConverter(obj.answer)}
              </h3>
            )}

            <p style={content.style}>{htmlcodeConverter(obj.comment)}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
export default CompletedQuiz
