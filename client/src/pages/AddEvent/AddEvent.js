import "./AddEvent.scss"
import {React, useState, useEffect} from "react"
import AddEventDetails from "./AddEventDetails"
import AddWorkoutDetails from "./AddWorkoutDetails"
import {useGlobalContext} from "../../store"

export default function AddEvent({addOpen, setAddOpen, loadUser, setLoading}) {
    const {
        user,
        createEventQuery,
        createExerciseWithEventIdQuery,
        getEventById,
        getExercisesFromEventIdQuery,
        getExerciseByIdQuery,
        eventState,
        exerciseState,
    } = useGlobalContext()

    const [workoutDetailsPage, setWorkoutDetailsPage] = useState(false)

    const today = new Date(Date.now())
    var startDate =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1 < 10
            ? "0" + (today.getMonth() + 1)
            : today.getMonth() + 1) +
        "-" +
        (today.getDate() < 10 ? "0" + today.getDate() : today.getDate()) +
        "T" +
        (today.getHours() < 10
            ? "0" + (today.getHours() + 1)
            : today.getHours() + 1) +
        ":" +
        (today.getMinutes() < 30 ? "00" : "30")

    var finishDate =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1 < 10
            ? "0" + (today.getMonth() + 1)
            : today.getMonth() + 1) +
        "-" +
        (today.getDate() < 10
            ? "0" + (today.getDate() + 1)
            : today.getDate() + 1) +
        "T" +
        (today.getHours() < 10
            ? "0" + (today.getHours() + 2)
            : today.getHours() + 2) +
        ":" +
        (today.getMinutes() < 30 ? "00" : "30")

    const [workoutDetailsList, setWorkoutDetailsList] = useState({
        title: "",
        description: "",
        type: "STANDARD",
        start: startDate,
        finish: finishDate,
    })

    const resetInput = () => {
        setWorkoutDetailsList({
            title: "",
            description: "",
            type: "STANDARD",
            start: startDate,
            finish: finishDate,
        })
    }

    const [workoutExerciseList, setWorkoutExerciseList] = useState([])

    const [detailButtonActive, setDetailButtonActive] = useState(true)
    const [workoutButtonActive, setWorkoutButtonActive] = useState(false)

    const handleClose = () => {
        setAddOpen(!addOpen)
        setWorkoutExerciseList([])
    }

    const handleButton1 = () => {
        if (workoutDetailsPage && workoutButtonActive) {
            setWorkoutDetailsPage(!workoutDetailsPage)
            setDetailButtonActive(!detailButtonActive)
            setWorkoutButtonActive(!workoutButtonActive)
        }
    }
    const handleButton2 = () => {
        if (!workoutDetailsPage && detailButtonActive) {
            setWorkoutDetailsPage(!workoutDetailsPage)
            setWorkoutButtonActive(!workoutButtonActive)
            setDetailButtonActive(!detailButtonActive)
        }
    }

    const exercise = [
        {
            type: "WEIGHTS",
            name: "BENCH",
            sets: 4,
            reps: 4,
        },
        {
            type: "WEIGHTS",
            name: "BENCH",
            sets: 4,
            reps: 4,
        },
    ]

    const [tempId, setTempId] = useState(user.events[user.events.length - 1])
    const handleSubmit = e => {
        e.preventDefault()
        setAddOpen(!addOpen)
        createEventQuery(workoutDetailsList)
        for (const e of exercise) {
            createExerciseWithEventIdQuery(
                user.events[user.events.length - 1],
                e,
            )
        }
        setTempId(user.events[user.events.length - 1])

        resetInput()
    }
    async function testing() {
        await getExercisesFromEventIdQuery(tempId)
        console.log(exerciseState)
        console.log(getEventById(tempId))
    }
    return (
        <div className={"add-event " + (addOpen && "active")}>
            <div className="top">
                <div className="topSplit1"></div>
                <div
                    className={
                        workoutDetailsList.type !== "STANDARD"
                            ? "topSplit2"
                            : "topSplit2 No"
                    }
                >
                    <button
                        className={
                            workoutButtonActive ? "button active" : "button"
                        }
                        onClick={handleButton1}
                    >
                        Details
                    </button>
                    <button
                        className={
                            workoutButtonActive ? "button active" : "button"
                        }
                        onClick={handleButton2}
                    >
                        Workout
                    </button>
                </div>
                <div className="topSplit3">
                    <div className="closeMenu" onClick={handleClose}>
                        <span className="line1"></span>
                        <span className="line2"></span>
                    </div>
                </div>
            </div>
            <div className="middle">
                {workoutDetailsPage ? (
                    <AddWorkoutDetails
                        setWorkoutDetailsPage={setWorkoutDetailsPage}
                        workoutExerciseList={workoutExerciseList}
                        setWorkoutExerciseList={setWorkoutExerciseList}
                        setAddOpen={setAddOpen}
                        addOpen={addOpen}
                    />
                ) : (
                    <AddEventDetails
                        setWorkoutDetailsPage={setWorkoutDetailsPage}
                        setAddOpen={setAddOpen}
                        addOpen={addOpen}
                        workoutDetailsList={workoutDetailsList}
                        setWorkoutDetailsList={setWorkoutDetailsList}
                        startDate={startDate}
                        finishDate={finishDate}
                    />
                )}
            </div>
            <div className="bottom">
                <div className="buttonWrapper">
                    <button type="reset" onClick={resetInput}>
                        Clear
                    </button>
                    <button type="submit" onClick={handleSubmit}>
                        Submit
                    </button>
                    <button onClick={testing}>TESTING</button>
                </div>
            </div>
        </div>
    )
}
