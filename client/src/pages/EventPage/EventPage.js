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
        createGoogleEventQuery,
    } = useGlobalContext()

    const [loading, setLoading] = useState(true)

    const [error, setError] = useState()

    const handleAddToGoogle = () => {
        createGoogleEventQuery({
            summary: getEventById(id).title,
            description: getEventById(id).description,
            startTime: getEventById(id).start.slice(0,-5),
            endTime: getEventById(id).finish.slice(0,-5)
        })
    }

    useEffect(() => {
        ;(async () => {
            console.log(id)
            let id = await eventFromIdQuery(id)
            await getExercisesFromEventIdQuery(id)
        })()
            .catch(setError)
            .finally(() => {
                setLoading(false)
            })
    }, [])

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
                            <h1>{getEventById(id).title}</h1>
                            <h2>{getEventById(id).type}</h2>
                            <h2>{getEventById(id).description}</h2>
                            <span>{getEventById(id).start}</span>
                            <span>{getEventById(id).finish}</span>
                        </div>
                        <div className="exerciseList">
                            {getEventById(id).exercises.map(id => (
                                <ExerciseContainer
                                    id={id}
                                    type={getExerciseById(id).type}
                                    name={getExerciseById(id).name}
                                    sets={getExerciseById(id).sets}
                                    reps={getExerciseById(id).reps}
                                />
                            ))}
                        </div>
                        <button onClick={handleAddToGoogle}>
                                Add To Google
                        </button>
                    </div>
                )}

                <BottomBar />
            </div>
        </div>
    )
}

export default EventPage
