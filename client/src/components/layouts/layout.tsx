import LoginPage from "@/pages/components/login"
import NavBar from "./bar/navbar"
import Sidebar from "./bar/sidebar"
import styles from "@/styles/Layout.module.css"
import { useApolloClient } from "@apollo/client"
import { useState } from "react"

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string>("")
  const client = useApolloClient()
  const logout = () => {
    setToken("")
    localStorage.clear()
    client.resetStore()
  }
  if (!token) {
    return (
      <main className={styles.main}>
        <LoginPage setToken={setToken} />
      </main>
    )
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
