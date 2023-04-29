import { content, heading } from "@/styles/font"

import Logo from "@/pages/components/widgets/Logo"

const LessonContent = ({
  title,
  lessonContent,
}: {
  title: string
  lessonContent: string
}) => {
  const splitTitle = title.split(" ")
  const modifyString = lessonContent.split("\n")
  return (
    <div>
      <div className="lessonHeader">
        <Logo content={splitTitle[0]} theme="dark" />
        <h1 style={heading.style}>{splitTitle[1]}</h1>
      </div>
      <div className="lessonContent">
        {modifyString.map((obj) =>
          /^[0-9]+\.\s.*$/.test(obj) ? (
            <h2 key={obj} style={heading.style}>
              {obj}
            </h2>
          ) : (
            <p key={obj} style={content.style}>
              {obj}
            </p>
          )
        )}
      </div>
    </div>
  )
}

export default LessonContent
