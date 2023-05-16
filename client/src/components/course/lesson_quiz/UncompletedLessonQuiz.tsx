import { content, heading } from "@/styles/font"
import { useEffect, useState } from "react"

import SubmitButton from "@/components/widgets/SubmitButton"
import { TextField } from "@mui/material"
import { htmlcodeConverter } from "@/helper/htmlCodeConverter"

const shuffleQuestionAndAnswer = (array: any[]) => {
  let shuffledArray = [...array]
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    let temp = shuffledArray[i]
    shuffledArray[i] = shuffledArray[j]
    shuffledArray[j] = temp
  }
  return shuffledArray
}

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
  const [shuffledQuiz, setShuffledQuiz] = useState<any[]>([...quizzes])
  const [fillInBox, setFillInBox] = useState(new Map())
  const submitQuiz = (e: any) => {
    onSubmit(e)
    setDone(true)
  }
  useEffect(() => {
    setShuffledQuiz([...shuffledQuiz, shuffleQuestionAndAnswer(quizzes)])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    const newShuffledQuiz = [...shuffledQuiz]
    for (let quiz of newShuffledQuiz) {
      if (quiz.choices.length > 0) {
        let newChoicesList = [...quiz.choices]
        setShuffledQuiz(
          newShuffledQuiz.map((squiz) =>
            squiz.id === quiz.id
              ? { ...squiz, choices: shuffleQuestionAndAnswer(newChoicesList) }
              : squiz
          )
        )
      } else {
        setFillInBox(fillInBox.set(quiz.id, ""))
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div>
      <form onSubmit={submitQuiz}>
        {shuffledQuiz.map((obj) => (
          <div className="quiz" key={obj.id}>
            <h3 style={heading.style}>{obj.question}</h3>
            {obj.choices.length === 0 ? (
              <TextField
                style={content.style}
                name={obj.id}
                value={fillInBox.get(obj.id)}
                color="warning"
                onChange={({ target }) => {
                  setFillInBox(fillInBox.set(obj.id, target.value))
                  onChange(target)
                }}
                fullWidth
                size="small"
              />
            ) : (
              <>
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
              </>
            )}
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
