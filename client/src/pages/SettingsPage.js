import React from 'react'
import "./SettingsPage.scss"
import BottomBar from "./PageOverlay/BottomBar.js"
import TopButtons from "./PageOverlay/TopButtons.js"
import Settings from "./Settings/Settings.js"
import { getMode } from "./Settings/Settings.js"
import SettingsToggles from './Settings/Settings.js'

var darkmode = getMode();

export default function SettingsPage() {
  return (
    <div id="settingspage" 
      class='darkmode ? "darkMode" : "lightMode"'>
      <TopButtons/>
      <div className="middle"> 
        <SettingsToggles/>
      </div> 
      <BottomBar/>
    </div>
  )
}

