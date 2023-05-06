import { logo } from "@/styles/font"

const Logo = ({
  children,
  theme,
}: {
  children: any
  theme: "light" | "dark"
}) => {
  return <div className={`${theme}Logo`}>{children}</div>
}

export default Logo
