import "./AddEvent.scss"
import {React, useState, useEffect, useCallback} from "react"
import AddEventDetails from "./AddEventDetails"
import AddWorkoutDetails from "./AddWorkoutDetails"
import CloseIcon from "@mui/icons-material/Close"
import {useGlobalContext} from "../../store"

export default function AddEvent({addOpen, setAddOpen, darkmode}) {
    const {
        user,
        createEventQuery,
        createExerciseWithEventIdQuery,
        currentUserEventQuery,
        eventState,
        eventFromIdQuery,
        getEventById,
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
        (today.getHours() < 9 ? "0" + today.getHours() : today.getHours()) +
        ":" +
        (today.getMinutes() < 30 ? "00" : "30")

    var finishDate =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1 < 10
            ? "0" + (today.getMonth() + 1)
            : today.getMonth() + 1) +
        "-" +
        (today.getDate() < 9 ? "0" + today.getDate() : today.getDate()) +
        "T" +
        (today.getHours() < 8
            ? "0" + (today.getHours() + 1)
            : today.getHours() + 1) +
        ":" +
        (today.getMinutes() < 30 ? "00" : "30")

    const [workoutDetailsList, setWorkoutDetailsList] = useState({
        title: "",
        description: "",
        type: "STANDARD",
        start: startDate,
        finish: finishDate,
    })

    const [workoutExerciseList, setWorkoutExerciseList] = useState([])

    const [detailButtonActive, setDetailButtonActive] = useState(true)
    const [workoutButtonActive, setWorkoutButtonActive] = useState(false)

    const resetInput = () => {
        setWorkoutDetailsList({
            title: "",
            description: "",
            type: "STANDARD",
            start: startDate,
            finish: finishDate,
        })
        setWorkoutExerciseList([])
        setWorkoutDetailsPage(false)
        setWorkoutButtonActive(false)
        setDetailButtonActive(true)
    }

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

    const [error, setError] = useState()
    const [addExercise, setAddExercise] = useState(false)

    useEffect(() => {
        if (addExercise) {
            ;(async () => {
                if (workoutDetailsList.type === "STANDARD") {
                    const id = await createEventQuery(workoutDetailsList)
                } else if (workoutDetailsList.type === "WORKOUT") {
                    const id = await createEventQuery(workoutDetailsList)
                    for (const el of workoutExerciseList) {
                        await createExerciseWithEventIdQuery(id, el)
                    }
                }
            })()
                .catch(setError)
                .then(() => {
                    setAddOpen(!addOpen)
                })
                .finally(() => {
                    resetInput()
                    setAddExercise(false)
                })
        }
    }, [addExercise])

    if (error) {
        return <>Error : {String(error)}</>
    }

    async function handleSubmit() {
        setAddExercise(true)
    }

    return (
        <div class={"theme " + (darkmode ? "light" : "dark")}>
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
                                "button " +
                                (darkmode ? "light" : "dark") +
                                (detailButtonActive ? " active" : "")
                            }
                            onClick={handleButton1}
                        >
                            DETAILS
                        </button>

                        <button
                            className={
                                "button " +
                                (darkmode ? "light" : "dark") +
                                (workoutButtonActive ? " active" : "")
                            }
                            onClick={handleButton2}
                        >
                            WORKOUT
                        </button>
                    </div>
                    <div className="topSplit3">
                        <div className="closeMenu" onClick={handleClose}>
                            <CloseIcon sx={{fontSize: 33}} />
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
                            darkmode={darkmode}
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
                            darkmode={darkmode}
                        />
                    )}
                </div>
                <div className="bottom">
                    <div
                        className={
                            "buttonWrapper " + (darkmode ? "light" : "dark")
                        }
                    >
                        <button
                            type="reset"
                            onClick={resetInput}
                            fontWeight="bold"
                        >
                            CLEAR
                        </button>
                        <button type="submit" onClick={handleSubmit}>
                            SUBMIT
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
