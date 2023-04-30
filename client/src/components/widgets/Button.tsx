import Link from "next/link"
import { content } from "@/styles/font"

const Button = ({ title, link }: { title: string; link: string }) => {
  return (
    <Link href={link} passHref>
      <button className="button">
        <span style={content.style}>{title}</span>
      </button>
    </Link>
  )
}

export default Button
