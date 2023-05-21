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
  const [shuffledQuiz, setShuffledQuiz] = useState<any[]>([])
  const [answerMap, setAnswerMap] = useState(new Map())

  const submitQuiz = (e: any) => {
    onSubmit(e)
    setDone(true)
  }
  useEffect(() => {
    setShuffledQuiz(shuffleQuestionAndAnswer(quizzes))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    let newQuiz = shuffleQuestionAndAnswer(quizzes)
    for (const quiz of newQuiz) {
      setAnswerMap(answerMap.set(quiz.id, " "))
      if (quiz.choices.length > 0) {
        newQuiz = newQuiz.map((squiz) =>
          squiz.id === quiz.id
            ? { ...squiz, choices: shuffleQuestionAndAnswer(quiz.choices) }
            : squiz
        )
      }
    }
    setShuffledQuiz(newQuiz)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div>
      <form onSubmit={submitQuiz}>
        {shuffledQuiz.map((obj) => (
          <div className="quiz" key={obj.id}>
            <h3 style={heading.style}>{htmlcodeConverter(obj.question)}</h3>
            {obj.choices.length === 0 ? (
              <TextField
                style={content.style}
                name={obj.id}
                value={answerMap.get(obj.id)}
                color="warning"
                onChange={({ target }) => {
                  setAnswerMap(answerMap.set(obj.id, target.value))
                  console.log(target)
                  onChange({ target })
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
