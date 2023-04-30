import Link from "next/link"
import { content } from "@/styles/font"

const ContinueLink = ({ url, title }: { url: string; title: string }) => {
  return (
    <div className="link">
      <Link href={url} style={content.style}>
        {title}
      </Link>
    </div>
  )
}

export default ContinueLink
