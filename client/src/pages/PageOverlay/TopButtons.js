import {React, useState, useEffect} from "react"
import "./TopButtons.scss"
import {Link} from "react-router-dom"
import SettingsIcon from "@mui/icons-material/Settings"
import AddIcon from "@mui/icons-material/Add"
import HomeIcon from "@mui/icons-material/Home"
import NotificationsIcon from "@mui/icons-material/Notifications"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import Tooltip from "@mui/material/Tooltip"

import ReminderWindow from "./ReminderWindow"
import {useGlobalContext} from "../../store"
export default function TopButtons({
    addOpen,
    setAddOpen,
    showButtonNotification,
    showButtonAdd,
    showButtonDeleteEvent,
    setDeleteEvent,
    setEventId,
    closeDashboard,
}) {
    const [bellOpen, setBellOpen] = useState(false)
    return (
        <div className="topWrapper">
            <div className="settingsHomeWrapper">
                <Tooltip title="Settings" enterDelay={500} placement="bottom">
                    <Link to="/settings" id="button">
                        <SettingsIcon sx={{fontSize: 33}} />
                    </Link>
                </Tooltip>
                <Tooltip title="Home" enterDelay={500} placement="bottom">
                    {closeDashboard ? (
                        <div id="home" onClick={() => setEventId()}>
                            <HomeIcon sx={{fontSize: 35}} />
                        </div>
                    ) : (
                        <Link to="/dashboard" id="home">
                            <HomeIcon sx={{fontSize: 35}} />
                        </Link>
                    )}
                </Tooltip>
            </div>

            <div className="notificationsAddWrapper">
                {showButtonNotification ? (
                    <div className="buttonWindow">
                        <button
                            className="notificationButton"
                            onClick={() => {
                                setBellOpen(!bellOpen)
                            }}
                        >
                            <NotificationsIcon sx={{fontSize: 35}} />
                        </button>
                        {bellOpen ? (
                            <ReminderWindow setBellOpen={setBellOpen} />
                        ) : (
                            <div />
                        )}
                    </div>
                ) : (
                    <div id="placeholder"></div>
                )}
                {showButtonAdd ? (
                    <Tooltip
                        title="Add Event"
                        enterDelay={500}
                        placement="bottom"
                    >
                        <button
                            className="addButton"
                            onClick={() => setAddOpen(!addOpen)}
                        >
                            <AddIcon sx={{fontSize: 35}} />
                        </button>
                    </Tooltip>
                ) : (
                    <div id="placeholder"></div>
                )}
                {showButtonDeleteEvent ? (
                    <button
                        className="deleteEvent"
                        onClick={() => setDeleteEvent(true)}
                    >
                        <DeleteForeverIcon sx={{fontSize: 35}} />
                    </button>
                ) : (
                    <div id="placeholder"></div>
                )}
            </div>
        </div>
    )
}
