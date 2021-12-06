import React, {useEffect, useState} from "react"
import {StandardLayout} from "../components"
import "./DashboardPage.scss"
import BottomBar from "./PageOverlay/BottomBar.js"
import TopButtons from "./PageOverlay/TopButtons.js"
import {useGlobalContext} from "../store"
import EventContainer from "./EventContainer/EventContainer.js"
import BackgroundImg from "../img/wolf.png"
import Clock from 'react-live-clock';
import AddEvent from "./AddEvent/AddEvent.js"


export default function DashboardPage({id, setId}) {
  const {user, isLoggedIn, currentUserEventQuery} = useGlobalContext()

  export default function DashboardPage({darkmode}) {
  const[selected, setSelected] = useState("events");

  const [addOpen, setAddOpen] = useState(false);
   useEffect(() => {
    currentUserEventQuery()
  }, [])
    
  return (
    <div class = {"theme " + (darkmode ? "light" : "dark")}>
      <div className="dashboard">
        <TopButtons className="TB" addOpen={addOpen} setAddOpen={setAddOpen}/>
        <AddEvent addOpen={addOpen} setAddOpen={setAddOpen}/>
        <div className="listWrapper">
          <div className="spacer" >
            <img src={BackgroundImg} alt="Wolf" />
          </div>
          <div className="middleSpacer">
            <Clock className="clock" format={'h:mm:ss a'} ticking={true} timezone={'US/Pacific'} />
            <ul>
              {user.data.events.map(el =>(
                <EventContainer whereTo="/event" active={selected === el.id} setSelected={setSelected} id={el.id} name={el.title} dateTime={el.start} darkmode={darkmode}/> 
              ))}
            </ul>
          </div>
          <div className="spacer" >
            <img src={BackgroundImg} alt="Wolf" />
          </div>
        </div>
        <div className="middleSpacer">
        <Clock className="clock" format={'h:mm:ss a'} ticking={true} timezone={'US/Pacific'} />
          <ul>
            {user.data.events.map(el =>(
              <EventContainer  setId={setId} id={el.id} name={el.title} dateTime={el.start} /> 
              ))}
          </ul>
        </div>
        <div className="spacer" >
          <img src={BackgroundImg} alt="Wolf" />
        </div>
      </div>
      <BottomBar />


      </div>
    </div>
  )
}