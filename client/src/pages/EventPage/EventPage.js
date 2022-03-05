import {React, useState, useEffect} from "react"
import "./EventPage.scss"
import BottomBar from "../PageOverlay/BottomBar.js"
import TopButtons from "../PageOverlay/TopButtons.js"
import ExerciseContainer from "./ExerciseContainer"
import {useGlobalContext} from "../../store"
import {Navigate} from "react-router"

const EventPage = ({id, darkmode}) => {
    const {
        getEventById,
        getExerciseById,
        getExercisesFromEventIdQuery,
        eventFromIdQuery,
        getUserById,
        userQuery,
        deleteEventQuery,
    } = useGlobalContext()

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()

    useEffect(() => {
        ;(async () => {
            await eventFromIdQuery(id)
            await getExercisesFromEventIdQuery(id)
            await userQuery(getEventById(id).owners[0])
        })()
            .catch(setError)

            .finally(() => {
                setLoading(false)
            })
    }, [])

    const [deleteEvent, setDeleteEvent] = useState(false)
    useEffect(() => {
        if (deleteEvent) {
            ;(async () => {
                await deleteEventQuery(id)
            })().catch(setError)
        }
    }, [deleteEvent])

    if (error) {
        return <>{error}</>
    }

    const event = getEventById(id)
    const eventOwner = getUserById(getEventById(id).owners[0])

    if (event !== undefined && eventOwner != undefined) {
        const start = new Date(event.start)
        const startDate =
            (start.getMonth() < 10
                ? "0" + start.getMonth()
                : start.getMonth()) +
            "/" +
            (start.getDate() < 10 ? "0" + start.getDate() : start.getDate()) +
            "/" +
            start.getFullYear()

        const startTime =
            (start.getHours() < 10
                ? "0" + start.getHours()
                : start.getHours()) +
            ":" +
            (start.getMinutes() < 10
                ? "0" + start.getMinutes()
                : start.getMinutes()) +
            ":" +
            (start.getSeconds() < 10
                ? "0" + start.getSeconds()
                : start.getSeconds())

        const finish = new Date(event.finish)
        const finishDate =
            (finish.getMonth() < 10
                ? "0" + finish.getMonth()
                : finish.getMonth()) +
            "/" +
            (finish.getDate() < 10
                ? "0" + finish.getDate()
                : finish.getDate()) +
            "/" +
            finish.getFullYear()

        const finishTime =
            (finish.getHours() < 10
                ? "0" + finish.getHours()
                : finish.getHours()) +
            ":" +
            (finish.getMinutes() < 10
                ? "0" + finish.getMinutes()
                : finish.getMinutes()) +
            ":" +
            (finish.getSeconds() < 10
                ? "0" + finish.getSeconds()
                : finish.getSeconds())

        const owner = eventOwner.firstName + " " + eventOwner.lastName
        const exercises = event.exercises.map(id => getExerciseById(id))
        const hasAllExercises = exercises.every(v => v != null)

        return (
            <div class={"theme " + (darkmode ? "light" : "dark")}>
                <div className="eventPage">
                    <TopButtons
                        showButtonAdd={false}
                        showButtonDeleteEvent={true}
                        showButtonNotification={false}
                        setDeleteEvent={setDeleteEvent}
                    />
                    {loading ? (
                        <div className="loading">
                            <span>LOADING</span>
                        </div>
                    ) : (
                        <div className="middle">
                            <div className="event">
                                <h1>{event.title}</h1>
                                <h2>{event.description}</h2>
                                {startDate === finishDate ? (
                                    <span>{"Date: " + startDate}</span>
                                ) : (
                                    <span>
                                        {"Dates: " +
                                            startDate +
                                            " - " +
                                            finishDate}
                                    </span>
                                )}

                                <span>
                                    {"Start Time: " +
                                        startTime +
                                        " - " +
                                        "Finish Time: " +
                                        finishTime}
                                </span>

                                <span>{"Created by: " + owner}</span>
                            </div>
                            {event.type === "WORKOUT" ? (
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
                            ) : (
                                <></>
                            )}
                        </div>
                    )}

                    <BottomBar />
                </div>
            </div>
        )
    } else {
        return <Navigate to={"/dashboard"} />
    }
}

export default EventPage
