import {React, useState} from 'react';
import "./AddWorkoutDetails.scss"
import Workout from "./Workout"

export default function AddWorkoutDetails({workoutList, setWorkoutList, addOpen, setAddOpen, workoutDetails, setWorkoutDetails}) {


  const[workout, setWorkout] = useState(
    {
      name: "",
      sets: "",
      reps: "",
    }
  )

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
      reps: ""
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    setWorkoutList(workoutList.concat(workout))
    resetWorkout()
  }

  return ( 
      <div className={workoutDetails === true ? "workoutDetails" : "workoutDetails notActive"}>
        <div className="columnTitles">
          <span>Name</span>
          <span>Sets</span>
          <span>Reps</span>
        </div>
        <div className="list" >
          {workoutList.map(el => (
            <Workout name={el.name} sets={el.sets} reps={el.reps} />
          ))}
        </div>
        <div className="inputs">
          <form onSubmit={handleSubmit}>

            <input type="text" name="name" value={workout.name} onChange={handleChange} />
            <input type="text" name="sets" value={workout.sets} onChange={handleChange} />
            <input type="text" name="reps" value={workout.reps} onChange={handleChange} />
            <button type="submit" >Add</button>
          </form>
        </div>
      </div>
  );
}
