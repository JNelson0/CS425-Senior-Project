import {React, useState, useEffect} from "react"
import "./EventPage.scss"
import BottomBar from "./PageOverlay/BottomBar.js"
import TopButtons from "./PageOverlay/TopButtons.js"
import {useGlobalContext} from "../store"
import AddEvent from "./AddEvent/AddEvent.js"

const EventPage = ({id, darkmode}) => {
    const {user} = useGlobalContext()

    const [addOpen, setAddOpen] = useState(false)

    return (
        <div class={"theme " + (darkmode ? "light" : "dark")}>
            {console.log(user)}
            <div className="event">
                <TopButtons addOpen={addOpen} setAddOpen={setAddOpen} />
                <AddEvent addOpen={addOpen} setAddOpen={setAddOpen} />
                <div className="middle">
                    <h1>{user.data.events[id].title}</h1>
                    <h2>{user.data.events[id].type}</h2>
                    <h3>{user.data.events[id].description}</h3>
                    <span>{user.data.events[id].start}</span>
                    <span>{user.data.events[id].finish}</span>
                </div>
                <BottomBar />
            </div>
        </div>
    )
}

export default EventPage
