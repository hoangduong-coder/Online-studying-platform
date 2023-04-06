import {
  AccountBox,
  Category,
  Dashboard,
  Logout,
  Settings,
} from "@mui/icons-material"

import Logo from "../../widgets/Logo"
import SideBarSelection from "./sidebar-selection"

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Logo />
      <ul>
        <li>
          <SideBarSelection url="/" icon={<Dashboard />} title="Dashboard" />
        </li>
        <li>
          <SideBarSelection
            url="/profile"
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
            url="/settings"
            icon={<Settings />}
            title="Settings"
          />
        </li>
        <li>
          <SideBarSelection
            url="/auth/login"
            icon={<Logout />}
            title="Logout"
          />
        </li>
      </ul>
    </div>
  )
}
export default Sidebar
