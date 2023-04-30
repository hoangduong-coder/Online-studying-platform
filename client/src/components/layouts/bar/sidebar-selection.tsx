import Link from "next/link"
import { heading } from "@/styles/font"

const SideBarSelection = ({
  url,
  logout,
  icon,
  title,
}: {
  url: string
  logout?: () => void
  icon: React.ReactNode
  title: string
}) => {
  if (logout) {
    return (
      <Link href={url} passHref>
        <div className="content" onClick={logout}>
          {icon}
          <h3 style={heading.style}>{title}</h3>
        </div>
      </Link>
    )
  }
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
