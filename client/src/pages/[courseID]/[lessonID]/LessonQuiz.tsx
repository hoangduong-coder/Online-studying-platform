import { content, heading } from "@/styles/font"

import Logo from "@/components/widgets/Logo"
import Quiz from "./Quiz"
import SubmitButton from "@/components/widgets/SubmitButton"

const LessonQuiz = ({ title, quizzes }: { title: string; quizzes: any[] }) => {
  const [number, ...rest] = title.split(" ")

  return (
    <div>
      <div className="lessonHeader">
        <Logo content={number} theme="dark" />
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
        <form>
          {quizzes.map((obj) => (
            <Quiz key={obj.id} title={obj.question} choices={obj.choices} />
          ))}
          <SubmitButton title="Submit" />
        </form>
      </div>
    </div>
  )
}

export default LessonQuiz
