import React from "react"
import "./CalendarPage.scss"
import BottomBar from "./PageOverlay/BottomBar.js"
import TopButtons from "./PageOverlay/TopButtons.js"
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

const CalendarPage = () => {
  return (
    <div className="calendar">
      <TopButtons/>
      <div className="middle"> </div>
      <BottomBar/>
    </div>    
  )
}

export default CalendarPage


