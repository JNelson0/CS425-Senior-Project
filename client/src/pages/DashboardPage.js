import React, {useEffect} from "react"
import {StandardLayout} from "../components"
import "./DashboardPage.scss"
import BottomBar from "./PageOverlay/BottomBar.js"
import TopButtons from "./PageOverlay/TopButtons.js"
import {useGlobalContext} from "../store"
// import Test from "./Test.js"

export default function DashboardPage() {
  const {user, isLoggedIn, currentUserQuery} = useGlobalContext()

  useEffect(() => {
    currentUserQuery()
  }, [])

  return (
    <div className="dashboard">
      <TopButtons />
      {isLoggedIn && <pre>{JSON.stringify(user, null, 2)}</pre>}
      <BottomBar />
    </div>
  )
}
