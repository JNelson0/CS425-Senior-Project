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
        <TopButtons/>

        <BottomBar/>
    </div>
  )
}
