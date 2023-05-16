/* eslint-disable react-hooks/exhaustive-deps */

import { content, heading, logo } from "@/styles/font"

import { GET_CURRENT_USER } from "@/graphql/user_query"
import Logo from "@/components/widgets/Logo"
import StudentQuiz from "./StudentQuiz"
import TeacherQuiz from "./TeacherQuiz"
import { useQuery } from "@apollo/client"

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

  const user = useQuery(GET_CURRENT_USER, { pollInterval: 2000 })
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
        {user.loading && <p style={content.style}>The server is loading ...</p>}
        {user.error && (
          <p style={content.style}>
            Something went wrong about getting User: ${user.error.message}
          </p>
        )}
        {user.data && user.data.getUser ? (
          <div>
            {user.data.getUser.__typename === "Teacher" ? (
              <TeacherQuiz quizzes={quizzes} />
            ) : (
              <StudentQuiz
                quizzes={quizzes}
                courseID={courseID}
                lessonID={lessonID}
              />
            )}
          </div>
        ) : (
          <p style={content.style}>The server is loading ...</p>
        )}
      </div>
    </div>
  )
}

export default LessonQuiz
