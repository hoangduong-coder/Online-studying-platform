import { logo } from "@/styles/font"

const Logo = ({
  content,
  theme,
}: {
  content: string
  theme: "light" | "dark"
}) => {
  return (
    <div className={`${theme}Logo`}>
      <p style={logo.style} className={`${theme}LogoContent`}>
        {content}
      </p>
    </div>
  )
}

export default Logo
