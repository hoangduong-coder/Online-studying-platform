import { Avatar } from "@mui/material"
import { Notifications } from "@mui/icons-material"

const NavBar = () => {
  return (
    <div className="navbar">
      <div>
        <Notifications />
      </div>
      <div>
        {" "}
        <Avatar />{" "}
      </div>
    </div>
  )
}

export default NavBar
