import LoginPage from "@/pages/auth/login"
import NavBar from "./bar/navbar"
import Sidebar from "./bar/sidebar"
import SignUpPage from "@/pages/auth/signup"
import styles from "@/styles/Layout.module.css"
import { useApolloClient } from "@apollo/client"
import { useState } from "react"

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string>("")
  const [newUser, setNewUser] = useState<boolean>(false)
  const client = useApolloClient()
  const logout = () => {
    setToken("")
    localStorage.clear()
    client.resetStore()
  }

  if (!token) {
    if (newUser) {
      return (
        <main className={styles.main}>
          <SignUpPage setNewUser={setNewUser} />
        </main>
      )
    } else {
      return (
        <main className={styles.main}>
          <LoginPage setToken={setToken} setNewUser={setNewUser} />
        </main>
      )
    }
  }

  return (
    <main className={styles.main}>
      <Sidebar logout={logout} />
      <div className={styles.mainPart}>
        <NavBar />
        <div className={styles.content}>{children}</div>
      </div>
    </main>
  )
}

export default Layout
