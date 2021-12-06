import React from "react"
import "./EventPage.scss"
import BottomBar from "./PageOverlay/BottomBar.js"
import TopButtons from "./PageOverlay/TopButtons.js"

const EventPage = ({darkmode}) => {
  return (
    <div class={"theme " + (darkmode ? "light" : "dark")}>
      <div className="event">
        <TopButtons/>
        <div className="middle"> 
          <h1 class = "text">Event page - not yet added</h1>
        </div>
        <BottomBar/>      
      </div>  
    </div>
      
  )
}

export default EventPage
