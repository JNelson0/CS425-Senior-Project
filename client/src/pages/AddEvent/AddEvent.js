import "./AddEvent.scss"
import {React, useState, useEffect} from "react"
import AddEventDetails from "./AddEventDetails"
import AddWorkoutDetails from "./AddWorkoutDetails"

export default function AddEvent({addOpen, setAddOpen, loadUser, setLoading}) {
    const [workoutDetails, setWorkoutDetails] = useState(false)
    const [workoutList, setWorkoutList] = useState([])

    const [detailButtonActive, setDetailButtonActive] = useState(true)
    const [workoutButtonActive, setWorkoutButtonActive] = useState(false)

    const [type, setType] = useState("STANDARD")

    const handleClose = () => {
        setAddOpen(!addOpen)
        setWorkoutList([])
    }

    const handleButton1 = () => {
        if (workoutDetails && workoutButtonActive) {
            setWorkoutDetails(!workoutDetails)
            setDetailButtonActive(!detailButtonActive)
            setWorkoutButtonActive(!workoutButtonActive)
        }
    }
    const handleButton2 = () => {
        if (!workoutDetails && detailButtonActive) {
            setWorkoutDetails(!workoutDetails)
            setWorkoutButtonActive(!workoutButtonActive)
            setDetailButtonActive(!detailButtonActive)
        }
    }

    return (
        <div className={"add-event " + (addOpen && "active")}>
            <div className="topWrapper">
                <div className="topSplit1"></div>
                <div
                    className={
                        type !== "STANDARD" ? "topSplit2" : "topSplit2 No"
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
            <AddEventDetails
                workoutDetails={workoutDetails}
                setWorkoutDetails={setWorkoutDetails}
                setAddOpen={setAddOpen}
                addOpen={addOpen}
                type={type}
                setType={setType}
                loadUser={loadUser}
                setLoading={setLoading}
            />
            <AddWorkoutDetails
                workoutList={workoutList}
                setWorkoutList={setWorkoutList}
                workoutDetails={workoutDetails}
                setWorkoutDetails={setWorkoutDetails}
                setAddOpen={setAddOpen}
                addOpen={addOpen}
            />
        </div>
    )
}
