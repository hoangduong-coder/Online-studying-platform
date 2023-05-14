import { content, heading } from "@/styles/font"

import { htmlcodeConverter } from "@/helper/htmlCodeConverter"

const TeacherQuiz = ({ quizzes }: { quizzes: any[] }) => {
  return (
    <div>
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
              The correct answer: {htmlcodeConverter(obj.answer)}
            </h3>
          </div>
        </div>
      ))}
    </div>
  )
}
export default TeacherQuiz
