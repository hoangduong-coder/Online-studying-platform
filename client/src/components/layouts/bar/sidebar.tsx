import { AccountBox, Category, Dashboard, Logout } from "@mui/icons-material"

import Logo from "../../widgets/Logo"
import SideBarSelection from "./sidebar-selection"

const Sidebar = ({ logout }: { logout: () => void }) => {
  return (
    <div className="sidebar">
      <Logo content="HD" theme="light" />
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
