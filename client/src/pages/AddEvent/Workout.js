import React from "react"
import "./Workout.scss"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"

export default function Workout({name, sets, reps, handleDelete,darkmode}) {
    return (
        <div class={"theme " + (darkmode ? "light" : "dark")}>
            <div className="workout">
                <div className="exercises">
                    <div className="workoutName">{name}</div>
                    <div className="sets">{sets}</div>
                    <div className="reps">{reps}</div>
                </div>
                <DeleteForeverIcon className="trash" onClick={handleDelete} />
            </div>
        </div>
    )
}
