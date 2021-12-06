import React from "react"
import "./CalendarPage.scss"
import BottomBar from "./PageOverlay/BottomBar.js"
import TopButtons from "./PageOverlay/TopButtons.js"

const CalendarPage = ({darkmode}) => {
  return (
    <div class={"theme " + (darkmode ? "light" : "dark")}>
      <div className="calendar">
        <TopButtons/>
        <div className="middle"> </div>
        <BottomBar/>
      </div> 
    </div>
       
  )
}

export default CalendarPage
