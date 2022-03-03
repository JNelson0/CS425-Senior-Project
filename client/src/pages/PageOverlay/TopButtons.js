import React from "react"
import "./TopButtons.scss"
import {Link} from "react-router-dom"
import SettingsIcon from "@mui/icons-material/Settings"
import AddIcon from "@mui/icons-material/Add"
import HomeIcon from "@mui/icons-material/Home"
import NotificationsIcon from "@mui/icons-material/Notifications"
import Tooltip from '@mui/material/Tooltip'

export default function TopButtons({
    addOpen,
    setAddOpen,
    showButtonNotification,
    showButtonAdd,
}) {
    return (
        <div className="topWrapper">
            <div className="settingsHomeWrapper">
                <Tooltip title="Settings" enterDelay={500} placement="bottom">
                    <Link to="/settings" id="button">
                        <SettingsIcon sx={{fontSize: 33}} />
                    </Link>
                </Tooltip>

                <Tooltip title="Dashboard" enterDelay={500} placement="bottom">
                    <Link to="/dashboard" id="home">
                        <HomeIcon sx={{fontSize: 35}} />
                    </Link>
                </Tooltip>
            </div>

            <div className="notificationsAddWrapper">
                {showButtonNotification ? (
                    <button
                        id="notificationButton"
                        onClick={() =>
                            console.log("Notifications button clicked!")
                        }
                    >
                        <NotificationsIcon sx={{fontSize: 35}} />
                    </button>
                ) : (
                    <div id="placeholder"></div>
                )}
                {showButtonAdd ? (
                    <Tooltip title="Dashboard" enterDelay={500} placement="bottom">
                        <button id="addButton" onClick={() => setAddOpen(!addOpen)}>
                            <AddIcon sx={{fontSize: 35}} />
                        </button>
                    </Tooltip>
                ) : (
                    <div id="placeholder"></div>
                )}
            </div>
        </div>
    )
}
