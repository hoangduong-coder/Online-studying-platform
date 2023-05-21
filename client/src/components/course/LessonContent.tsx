import { content, heading, logo } from "@/styles/font"

import Logo from "@/components/widgets/Logo"
import { htmlcodeConverter } from "@/helper/htmlCodeConverter"

const LessonContent = ({
  title,
  lessonContent,
}: {
  title: string
  lessonContent: string
}) => {
  const [number, ...rest] = title.split(" ")
  const modifyString = lessonContent.split("\n")
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
      <div className="lessonContent">
        {modifyString.map((obj) =>
          /^[0-9]+\.\s.*$/.test(obj) ? (
            <h2 key={obj} style={heading.style}>
              {obj}
            </h2>
          ) : (
            <p key={obj} style={content.style}>
              {htmlcodeConverter(obj)}
            </p>
          )
        )}
      </div>
    </div>
  )
}

export default LessonContent
