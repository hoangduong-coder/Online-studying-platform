import { content } from "@/styles/font"

const SubmitButton = ({ title, onClick }: { title: string; onClick?: any }) => {
  if (!onClick) {
    return (
      <button className="button" type="submit">
        <span style={content.style}>{title}</span>
      </button>
    )
  }
  return (
    <button className="button" type="submit" onClick={onClick}>
      <span style={content.style}>{title}</span>
    </button>
  )
}

export default SubmitButton
