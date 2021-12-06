import React from 'react'
import "./SettingsPage.scss"
import BottomBar from "./PageOverlay/BottomBar.js"
import TopButtons from "./PageOverlay/TopButtons.js"
import Settings from "./Settings/Settings.js"
import { getMode } from "./Settings/Settings.js"
import SettingsToggles from './Settings/Settings.js'

var darkmode = getMode();

export default function SettingsPage({darkmode, setS}) {

  return (
    <div class ="settingspage">
      <div class={"theme " + (darkmode ? "light" : "dark")}>
        <TopButtons/>
        <div className="middle">
          <ul> 
            <lc> <button type="button" onClick={() => setS(!darkmode)}> Theme </button> </lc>
            <lc> <SettingsToggles/> </lc>
          </ul>
        </div> 
        <BottomBar/>
      </div>
    </div>
  )
}

