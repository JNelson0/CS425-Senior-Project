import React from "react"
import "./TopButtons.scss"
import {Link} from "react-router-dom"
import SettingsIcon from "@mui/icons-material/Settings"
import AddIcon from "@mui/icons-material/Add"
import HomeIcon from "@mui/icons-material/Home"
import NotificationsIcon from "@mui/icons-material/Notifications"

export default function TopButtons({addOpen, setAddOpen, showButtonNotification, showButtonAdd}) {
    return (
        <div className="topWrapper">
            <div className="settingsHomeWrapper">
                <Link to="/settings" id="button"><SettingsIcon sx={{fontSize: 33}} /></Link>
                <Link to="/" id="home"><HomeIcon sx={{fontSize: 35}}/></Link>
            </div>

            <div className="notificationsAddWrapper">
                {showButtonNotification ? <button id="notificationButton" onClick={() => console.log("Notifications button clicked!")}>
                    <NotificationsIcon sx={{fontSize: 35}}/>
                </button> : <div></div>}
                {showButtonAdd ? <button id="addButton" onClick={() => setAddOpen(!addOpen)}>
                    <AddIcon sx={{fontSize: 35}}/>
                </button> : <div></div>}
            </div>
        </div>
    )
}
