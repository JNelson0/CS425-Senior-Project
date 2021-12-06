import {React, useState, useEffect} from "react"
import "./EventPage.scss"
import BottomBar from "./PageOverlay/BottomBar.js"
import TopButtons from "./PageOverlay/TopButtons.js"
import {useGlobalContext} from "../store"
import AddEvent from "./AddEvent/AddEvent.js"

const EventPage = ({id}) => {
  const {event, eventFromIdQuery} = useGlobalContext()

  useEffect(() => {
    eventFromIdQuery(id)
  }, [])

  const [addOpen, setAddOpen] = useState(false);
  
  return (
    <div className="event">
      <TopButtons addOpen={addOpen} setAddOpen={setAddOpen}/>
      <AddEvent addOpen={addOpen} setAddOpen={setAddOpen}/>
      <div className="middle">
         <h1>{event.data.title}</h1>
         <h2>{event.data.type}</h2>
         <h3>{event.data.description}</h3>
         <span>{event.data.start}</span>
         <span>{event.data.finish}</span>
      </div>
      <BottomBar/>      
    </div>    
  )
}

export default EventPage
