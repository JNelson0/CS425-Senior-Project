import React from 'react'
import {Link} from 'react-router-dom'
import "./BottomBar.scss"
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

export default function BottomBar() {
    return (
        <div className="bottombar">
            <div className="bottombarWrapper">
                <Link to="/dashboard" id="left"><DashboardIcon sx={{fontSize: 35}}/></Link>
                <Link to="/calendar"id="center"><CalendarTodayIcon sx={{fontSize: 35}}/></Link>
                <Link to="/event"id="right"><FitnessCenterIcon sx={{fontSize: 35}}/></Link>
            </div>
        </div>
    )
}
