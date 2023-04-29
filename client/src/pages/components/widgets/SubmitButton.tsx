import { content } from "@/styles/font"

const SubmitButton = ({ title }: { title: string }) => {
  return (
    <button className="button" type="submit">
      <span style={content.style}>{title}</span>
    </button>
  )
}

export default SubmitButton
