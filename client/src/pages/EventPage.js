import {React, useState, useEffect} from "react"
import "./EventPage.scss"
import BottomBar from "./PageOverlay/BottomBar.js"
import TopButtons from "./PageOverlay/TopButtons.js"
import {useGlobalContext} from "../store"
import AddEvent from "./AddEvent/AddEvent.js"

const EventPage = ({id, darkmode}) => {
    const {user, getEventById, getExerciseById, getExercisesFromEventIdQuery} =
        useGlobalContext()

    async function getEventWithExercises() {
        await getExercisesFromEventIdQuery(id)

        console.log(getEventById(id))
        console.log(getExerciseById(getEventById(id).exercises[0]))
    }

    const [loading, setLoading] = useState(true)
    if (loading) {
        setLoading(false)
        getEventWithExercises()
    }

    return (
        <div class={"theme " + (darkmode ? "light" : "dark")}>
            <div className="event">
                <TopButtons showButtonAdd={false} />
                <div className="middle">
                    <div className="event">
                        <h1>{getEventById(id).title}</h1>
                        <h2>{getEventById(id).type}</h2>
                        <h3>{getEventById(id).description}</h3>
                        <span>{getEventById(id).start}</span>
                        <span>{getEventById(id).finish}</span>
                    </div>
                    <div className="exercise">
                        <div className="exercise">
                            {getEventById(id).exercises.map(id => (
                                <div>
                                    {getExerciseById(id).type +
                                        " " +
                                        getExerciseById(id).name +
                                        " " +
                                        getExerciseById(id).sets +
                                        " " +
                                        getExerciseById(id).reps}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <BottomBar />
            </div>
        </div>
    )
}

export default EventPage
