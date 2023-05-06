/* eslint-disable react-hooks/exhaustive-deps */

import { ANSWER_QUIZ, GET_QUIZ_RESULT } from "@/graphql/course_query"
import { content, heading, logo } from "@/styles/font"
import { useMutation, useQuery } from "@apollo/client"

import CompletedQuiz from "./CompletedQuiz"
import Logo from "@/components/widgets/Logo"
import UncompletedLessonQuiz from "./UncompletedLessonQuiz"
import { useState } from "react"

interface QuizAnswer {
  quizID: string
  answer: string
}

const LessonQuiz = ({
  title,
  quizzes,
  courseID,
  lessonID,
}: {
  title: any
  quizzes: any[]
  courseID: any
  lessonID: any
}) => {
  const [number, ...rest] = title.split(" ")

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
    console.log(answerList)
  }

  const onSubmit = (e: any) => {
    e.preventDefault()
    for (const obj of quizzes) {
      if (!answerList.find((ans) => ans.quizID === obj.id)) {
        setAnswerList(answerList.concat({ quizID: obj.id, answer: "" }))
      }
    }
    answerQuiz({
      variables: {
        courseId: courseID,
        lessonId: lessonID,
        answers: answerList,
      },
    })
  }

  return (
    <div>
      <div className="lessonHeader">
        <Logo theme="dark">
          <p style={logo.style} className="darkLogoContent">
            {number}
          </p>
        </Logo>
        <h1 style={heading.style}>{rest.join(" ")}</h1>
      </div>
      <div className="reminder">
        <p style={content.style}>
          This quiz has {quizzes.length} question(s). Contact your course
          teacher&apos;s email in case you suffers with any problems while doing
          the quiz.
        </p>
        <h3 style={heading.style}>
          <i>You have only 1 attempt for this quiz. Good luck!</i>
        </h3>
      </div>
      <div className="lessonContent">
        {overallResult.loading && (
          <p style={content.style}>The server is loading ...</p>
        )}
        {overallResult.error && (
          <p style={content.style}>Something went wrong</p>
        )}
        {overallResult.data ? (
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
      </div>
    </div>
  )
}

export default LessonQuiz
