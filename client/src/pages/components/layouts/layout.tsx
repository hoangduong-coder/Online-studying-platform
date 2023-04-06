import NavBar from "./bar/navbar"
import Sidebar from "./bar/sidebar"
import styles from "@/styles/Layout.module.css"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className={styles.main}>
      <Sidebar />
      <div className={styles.mainPart}>
        <NavBar />
        <div className={styles.content}>{children}</div>
      </div>
    </main>
  )
}

export default Layout
