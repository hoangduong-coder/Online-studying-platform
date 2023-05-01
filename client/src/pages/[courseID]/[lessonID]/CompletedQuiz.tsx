import { content, heading } from "@/styles/font"

import { htmlcodeConverter } from "@/helper/htmlCodeConverter"

const returnResult = (result: any[], quizID: any) => {
  return result.find((obj: any) => obj.quizID === quizID)
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
  console.log(result)
  return (
    <div>
      <div className="point">
        <h3 style={heading.style}>Your final point is {point.toFixed(1)}/10</h3>
      </div>
      {quizzes.map((obj) => (
        <div key={obj.id}>
          <div className="quiz">
            <h3 style={heading.style}>{obj.question}</h3>
            {obj.choices.map((choice: any) => (
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
            ))}
          </div>
          <div className="comment">
            <h3 style={heading.style}>
              Your replied answer:{" "}
              {htmlcodeConverter(returnResult(result, obj.id).answer)}
            </h3>
            <p style={content.style}>
              {htmlcodeConverter(returnResult(result, obj.id).comment)}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
export default CompletedQuiz
