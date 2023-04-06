import Link from "next/link"
import { content } from "@/styles/font"

const Button = ({ title }: { title: string }) => {
  return (
    <Link href="/" passHref>
      <button className="button">
        <span style={content.style}>{title}</span>
      </button>
    </Link>
  )
}

export default Button
