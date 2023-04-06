import Link from "next/link"
import { heading } from "@/styles/font"

const SideBarSelection = ({
  url,
  icon,
  title,
}: {
  url: string
  icon: React.ReactNode
  title: string
}) => {
  return (
    <Link href={url} passHref>
      <div className="content">
        {icon}
        <h3 style={heading.style}>{title}</h3>
      </div>
    </Link>
  )
}

export default SideBarSelection
