import React from "react"
import "./SettingsPage.scss"
import BottomBar from "./PageOverlay/BottomBar.js"
import TopButtons from "./PageOverlay/TopButtons.js"
import Settings from "./Settings/Settings.js"
import {getMode} from "./Settings/Settings.js"
import SettingsToggles from "./Settings/Settings.js"

var darkmode = getMode()

export default function SettingsPage({darkmode, setS, settingsOpen}) {
    return (
        <div class={"theme " + (darkmode ? "light" : "dark")}>
            <div class={"settingspage " + (settingsOpen && "active")}>
                <div className="middle">
                    <SettingsToggles
                        toggle={darkmode}
                        setS={setS}
                        settingsOpen={settingsOpen}
                    />
                </div>
            </div>
        </div>
    )
}
