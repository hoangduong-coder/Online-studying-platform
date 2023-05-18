import { ANSWER_QUIZ, GET_QUIZ_RESULT } from "@/graphql/course_query"
import { useMutation, useQuery } from "@apollo/client"

import CompletedQuiz from "./CompletedQuiz"
import UncompletedLessonQuiz from "./UncompletedLessonQuiz"
import { content } from "@/styles/font"
import { useState } from "react"

interface QuizAnswer {
  quizID: string
  answer: string
}

const StudentQuiz = ({
  quizzes,
  courseID,
  lessonID,
}: {
  quizzes: any[]
  courseID: any
  lessonID: any
}) => {
  const overallResult = useQuery(GET_QUIZ_RESULT, {
    variables: { courseId: courseID, lessonId: lessonID },
    pollInterval: 2000,
  })
  const [answerList, setAnswerList] = useState<QuizAnswer[]>([])

  const [answerQuiz] = useMutation(ANSWER_QUIZ, {
    onError: (error) => alert(`Something went wrong ${error.message}`),
  })
  const onChangeAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
    const haveQuizId = answerList.find((obj) => obj.quizID === e.target.name)
    if (!haveQuizId) {
      setAnswerList(
        answerList.concat({
          quizID: e.target.name,
          answer: e.target.value,
        })
      )
    } else {
      setAnswerList(
        answerList.map((obj) => {
          return obj.quizID === e.target.name
            ? { quizID: e.target.name, answer: e.target.value }
            : obj
        })
      )
    }
  }
  const onSubmit = (e: any) => {
    e.preventDefault()
    answerQuiz({
      variables: {
        courseId: courseID,
        lessonId: lessonID,
        answers: answerList,
      },
    })
  }
  return (
    <>
      {overallResult.loading && (
        <p style={content.style}>The server is loading ...</p>
      )}
      {overallResult.error && (
        <p style={content.style}>
          Something went wrong: ${overallResult.error.message}
        </p>
      )}
      {overallResult.data && overallResult.data.getQuizResult ? (
        <CompletedQuiz
          result={overallResult.data.getQuizResult.comments}
          quizzes={quizzes}
          point={overallResult.data.getQuizResult.point}
        />
      ) : (
        <UncompletedLessonQuiz
          quizzes={quizzes}
          onChange={onChangeAnswer}
          onSubmit={onSubmit}
        />
      )}
    </>
  )
}

export default StudentQuiz
