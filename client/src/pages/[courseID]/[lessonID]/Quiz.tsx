import { content, heading } from "@/styles/font"

import { unicodeConverter } from "@/helper/htmlCodeConverter"

const Quiz = ({ title, choices }: { title: string; choices: string[] }) => {
  return (
    <div className="quiz">
      <h3 style={heading.style}>{title}</h3>
      {choices.map((choice) => (
        <div key={choice}>
          <input type="radio" id="choices" value={choice} name="choice" />
          <label htmlFor={choice} style={content.style}>
            {unicodeConverter(choice)}
          </label>
        </div>
      ))}
    </div>
  )
}

export default Quiz
