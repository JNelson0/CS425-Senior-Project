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
  const[id, setId] = useState()

  const handleDelete = () => {
    workoutList.splice(id, 1)
    const tempList = workoutList.map(e => e)
    setWorkoutList(tempList)
    console.log(workoutList)
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
            <Workout key={workoutList.findIndex(e => e === el)} name={el.name} sets={el.sets} reps={el.reps} handleDelete={handleDelete} setId={setId} />
          ))}
        </div>
        <div className="inputs">
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" value={workout.name} onChange={handleChange} placeholder="Enter name of workout" required />
            <input type="number" min="1" name="sets" value={workout.sets} onChange={handleChange} placeholder="Enter number of sets" required />
            <input type="number" min="1" name="reps" value={workout.reps} onChange={handleChange} placeholder="Enter number of reps" required />
            <button type="submit" >Add</button>
          </form>
        </div>
      </div>
  );
}
