import {React, useState} from "react"
import "./AddWorkoutDetails.scss"
import Workout from "./Workout"

export default function AddWorkoutDetails({
    workoutList,
    setWorkoutList,
    addOpen,
    setAddOpen,
    workoutExerciseList,
    setWorkoutExerciseList,
    darkmode
}) {
    const [workout, setWorkout] = useState({
        name: "",
        sets: "",
        reps: "",
        type: "WEIGHTS",
    })

    const handleChange = e => {
        setWorkout({
            ...workout,
            [e.target.name]: e.target.value,
        })
    }

    const resetWorkout = () => {
        setWorkout({
            name: "",
            sets: "",
            reps: "",
            type: "WEIGHTS",
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        setWorkoutExerciseList(workoutExerciseList.concat(workout))
        resetWorkout()
    }
    const [id, setId] = useState()

    const handleDelete = () => {
        workoutExerciseList.splice(id, 1)
        const tempList = workoutExerciseList.map(e => e)
        setWorkoutExerciseList(tempList)
    }

    return (
        <div class={"theme " + (darkmode ? "light" : "dark")}>
            <div className="workoutDetails">
                <div className="list">
                    <div className="heading">
                        <span>Name</span>
                        <span>Sets</span>
                        <span>Reps</span>
                        <div className="Empty" />
                    </div>
                    {workoutExerciseList.map(el => (
                        <Workout
                            key={workoutExerciseList.findIndex(e => e === el)}
                            name={el.name}
                            sets={el.sets}
                            reps={el.reps}
                            handleDelete={handleDelete}
                            setId={setId}
                            darkmode={darkmode}
                        />
                    ))}
                </div>
                <div className="inputs">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            value={workout.name}
                            onChange={handleChange}
                            placeholder="Enter name of workout"
                            required
                        />
                        <input
                            type="number"
                            min="1"
                            name="sets"
                            value={workout.sets}
                            onChange={handleChange}
                            placeholder="Enter number of sets"
                            required
                        />
                        <input
                            type="number"
                            min="1"
                            name="reps"
                            value={workout.reps}
                            onChange={handleChange}
                            placeholder="Enter number of reps"
                            required
                        />
                        <button type="submit">Add</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
