import React from "react"
import {Link} from "react-router-dom"
import "./BottomBar.scss"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
import DashboardIcon from "@mui/icons-material/Dashboard"
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import Tooltip from '@mui/material/Tooltip'


export default function BottomBar() {
    return (
        <div className="bottombar">
            <div className="bottombarWrapper">
                <Tooltip title="Dashboard" enterDelay={500} placement="top">
                    <Link to="/dashboard" id="left"><DashboardIcon sx={{fontSize: 35}}/></Link>
                </Tooltip>

                <Tooltip title="Calendar" enterDelay={500} placement="top">
                    <Link to="/calendar"id="center"><CalendarTodayIcon sx={{fontSize: 35}}/></Link>
                </Tooltip>

                <Tooltip title="Groups" enterDelay={500} placement="top">
                    <Link to="/group"id="right"><PeopleAltIcon sx={{fontSize: 35}}/></Link>
                </Tooltip>
            </div>
        </div>
    )
}
