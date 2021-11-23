import React from 'react'
import "./SettingsPage.scss"
import BottomBar from "./PageOverlay/BottomBar.js"
import TopButtons from "./PageOverlay/TopButtons.js"
import Settings from "./Settings.js"

export default function SettingsPage() {
  return (
    <div className="settings">
      <TopButtons/>
      <Settings/>
      <BottomBar/>
    </div>
  )
}

