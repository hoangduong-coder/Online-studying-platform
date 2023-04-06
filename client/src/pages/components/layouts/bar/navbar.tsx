import { Avatar } from "@mui/material"
import { Notifications } from "@mui/icons-material"

const NavBar = () => {
  return (
    <div className="navbar">
      <div>
        <Notifications />
      </div>
      <div>
        <Avatar>HD</Avatar>
      </div>
    </div>
  )
}

export default NavBar
