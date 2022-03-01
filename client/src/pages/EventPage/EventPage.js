import {React, useState, useEffect} from "react"
import "./EventPage.scss"
import BottomBar from "../PageOverlay/BottomBar.js"
import TopButtons from "../PageOverlay/TopButtons.js"
import ExerciseContainer from "./ExerciseContainer"
import {useGlobalContext} from "../../store"

const EventPage = ({id, darkmode}) => {
    const {
        getEventById,
        getExerciseById,
        getExercisesFromEventIdQuery,
        eventFromIdQuery,
    } = useGlobalContext()

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()

    useEffect(() => {
        ;(async () => {
            console.log(id)
            await eventFromIdQuery(id)
            await getExercisesFromEventIdQuery(id)
        })()
            .catch(setError)
            .finally(() => {
                setLoading(false)
            })
    }, [])

    const event = getEventById(id)
    const exercises = event.exercises.map(id => getExerciseById(id))
    const hasAllExercises = exercises.every(v => v != null)
    console.log(exercises)

    return (
        <div class={"theme " + (darkmode ? "light" : "dark")}>
            <div className="event">
                <TopButtons showButtonAdd={false} />
                {loading ? (
                    <div className="loading">
                        <span>LOADING</span>
                    </div>
                ) : (
                    <div className="middle">
                        <div className="event">
                            <h1>{event.title}</h1>
                            <h2>{event.type}</h2>
                            <h2>{event.description}</h2>
                            <span>{event.start}</span>
                            <span>{event.finish}</span>
                        </div>
                        <div className="exerciseList">
                            {hasAllExercises ? (
                                exercises.map(exercise => (
                                    <ExerciseContainer
                                        id={exercise.id}
                                        type={exercise.type}
                                        name={exercise.name}
                                        sets={exercise.sets}
                                        reps={exercise.reps}
                                    />
                                ))
                            ) : (
                                <>Loading...</>
                            )}
                        </div>
                    </div>
                )}

                <BottomBar />
            </div>
        </div>
    )
}

export default EventPage
