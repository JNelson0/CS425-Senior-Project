import React, {useEffect} from "react"
import {StandardLayout} from "../components"
import "./DashboardPage.scss"
import BottomBar from "./PageOverlay/BottomBar.js"
import TopButtons from "./PageOverlay/TopButtons.js"
import {useGlobalContext} from "../store"

export default function DashboardPage() {
  const {user, isLoggedIn, currentUserQuery} = useGlobalContext()
  const {event , currentUserEventQuery} = useGlobalContext()
  const {deleteEventQuery} = useGlobalContext()

  useEffect(() => {
    currentUserQuery()
    currentUserEventQuery()
    }, [])

  return (
    <div className="dashboard">
      <TopButtons />
      {/*isLoggedIn && <pre>{JSON.stringify(user, null, 2)}</pre>*/}
      <BottomBar />

      <TopButtons />
      {isLoggedIn && <pre>{JSON.stringify(user, null, 2)}</pre>}
      <button onPress{() => deleteEventQuery(1)}>+</button>
      <BottomBar />

    </div>
  )
}
