import React from "react"
import {StandardLayout} from "../components"
import {useUser} from "../hooks"
import "./DashboardPage.scss"
import BottomBar from "./PageOverlay/BottomBar.js"
import TopButtons from "./PageOverlay/TopButtons.js"

import Test from "./Test.js"

export default function DashboardPage() {
  return (
    <div className="dashboard">
<<<<<<< Updated upstream
        <TopButtons/>

        <BottomBar/>
=======
      <TopButtons />
      {/*isLoggedIn && <pre>{JSON.stringify(user, null, 2)}</pre>*/}
      <BottomBar />
>>>>>>> Stashed changes
    </div>
  )
}
