import React, {useEffect, useState} from "react"
import {StandardLayout} from "../components"
import "./DashboardPage.scss"
import BottomBar from "./PageOverlay/BottomBar.js"
import TopButtons from "./PageOverlay/TopButtons.js"
import {useGlobalContext} from "../store"
import data from "./DataTest.json"
import EventContainer from "./EventContainer/EventContainer.js"
import BackgroundImg from "../img/wolf.png"
import Clock from 'react-live-clock';


export default function DashboardPage() {
  const {event, isLoggedIn, currentUserEventQuery} = useGlobalContext()
  const[selected, setSelected] = useState("events");

   useEffect(() => {
     //currentUserQuery()
     currentUserEventQuery()
     }, [])

  return (
    <div className="dashboard">
      <TopButtons className="TB"/>
      <div className="listWrapper">
        <div className="spacer" >
          <img src={BackgroundImg} alt="Wolf" />
        </div>
        <div className="middleSpacer">
        <Clock className="clock" format={'h:mm:ss a'} ticking={true} timezone={'US/Pacific'} />
          <ul>
            {data.map(el =>(
              <EventContainer whereTo="/event" active={selected === el.data.title} setSelected={setSelected} id={el.data.id} name={el.data.title} dateTime={el.data.start} />
            ))}
          </ul>
        </div>
        <div className="spacer" >
          <img src={BackgroundImg} alt="Wolf" />
        </div>
      </div>
      {/* {isLoggedIn && <pre>{JSON.stringify(event, null, 2)}</pre>} */}
      <BottomBar />

    </div>
  )
}