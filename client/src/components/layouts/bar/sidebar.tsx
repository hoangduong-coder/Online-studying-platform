import { AccountBox, Category, Dashboard, Logout } from "@mui/icons-material"

import Link from "next/link"
import Logo from "../../widgets/Logo"
import SideBarSelection from "./sidebar-selection"
import { logo } from "@/styles/font"

const Sidebar = ({ logout }: { logout: () => void }) => {
  return (
    <div className="sidebar">
      <Logo theme="light">
        <Link style={{ textDecoration: "none" }} href="/">
          <p style={logo.style} className="lightLogoContent">
            HD
          </p>
        </Link>
      </Logo>
      <ul>
        <li>
          <SideBarSelection url="/" icon={<Dashboard />} title="Dashboard" />
        </li>
        <li>
          <SideBarSelection
            url="/profile/myprofile"
            icon={<AccountBox />}
            title="Profile"
          />
        </li>
        <li>
          <SideBarSelection
            url="/categories"
            icon={<Category />}
            title="Categories"
          />
        </li>
        <li>
          <SideBarSelection
            url="/"
            logout={logout}
            icon={<Logout />}
            title="Logout"
          />
        </li>
      </ul>
    </div>
  )
}
export default Sidebar
