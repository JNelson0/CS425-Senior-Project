import React from "react"
import "./EventPage.scss"
import BottomBar from "./PageOverlay/BottomBar.js"
import TopButtons from "./PageOverlay/TopButtons.js"

const EventPage = () => {
  return (
    <div className="event">
      <TopButtons/>
      <div className="middle"> </div>
      <BottomBar/>      
    </div>    
  )
}

export default EventPage
