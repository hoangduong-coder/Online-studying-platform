import { content, heading } from "@/styles/font"
import { useEffect, useState } from "react"

import SubmitButton from "@/components/widgets/SubmitButton"
import { htmlcodeConverter } from "@/helper/htmlCodeConverter"

const UncompletedLessonQuiz = ({
  quizzes,
  onChange,
  onSubmit,
}: {
  quizzes: any[]
  onChange: any
  onSubmit: any
}) => {
  const [done, setDone] = useState(false)
  const submitQuiz = (e: any) => {
    onSubmit(e)
    setDone(true)
  }
  return (
    <div>
      <form onSubmit={submitQuiz}>
        {quizzes.map((obj) => (
          <div className="quiz" key={obj.id}>
            <h3 style={heading.style}>{obj.question}</h3>
            {obj.choices.map((choice: any) => (
              <div key={choice}>
                <input
                  type="radio"
                  id="choices"
                  disabled={done}
                  value={choice}
                  name={obj.id}
                  onChange={onChange}
                />
                <label htmlFor={choice} style={content.style}>
                  {htmlcodeConverter(choice)}
                </label>
              </div>
            ))}
          </div>
        ))}
        {!done ? (
          <SubmitButton title="Submit" />
        ) : (
          <div className="comment">
            <p style={heading.style}>You have finished the quiz!</p>
          </div>
        )}
      </form>
    </div>
  )
}

export default UncompletedLessonQuiz
