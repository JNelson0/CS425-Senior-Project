import {React, useState, useEffect} from "react"
import "./EventPage.scss"
import BottomBar from "./PageOverlay/BottomBar.js"
import TopButtons from "./PageOverlay/TopButtons.js"
import {useGlobalContext} from "../store"
import AddEvent from "./AddEvent/AddEvent.js"

const EventPage = ({id, darkmode}) => {
    const {getEventById} = useGlobalContext()

    const [addOpen, setAddOpen] = useState(false)

    return (
        <div class={"theme " + (darkmode ? "light" : "dark")}>
            <div className="event">
                <TopButtons addOpen={addOpen} setAddOpen={setAddOpen} />
                <AddEvent addOpen={addOpen} setAddOpen={setAddOpen} />
                <div className="middle">
                    <h1>{getEventById(id).title}</h1>
                    <h2>{getEventById(id).type}</h2>
                    <h3>{getEventById(id).description}</h3>
                    <span>{getEventById(id).start}</span>
                    <span>{getEventById(id).finish}</span>
                </div>
                <BottomBar />
            </div>
        </div>
    )
}

export default EventPage
