import React from 'react'
import "./SettingsPage.scss"
import BottomBar from "./PageOverlay/BottomBar.js"
import TopButtons from "./PageOverlay/TopButtons.js"
import Settings from "./Settings/Settings.js"

export default function SettingsPage() {
  return (
    <div className="settings">
      <TopButtons/>
      <Settings/>
      <div className="middle"> </div>
      <BottomBar/>
    </div>
  )
}

