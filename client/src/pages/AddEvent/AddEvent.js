import "./AddEvent.scss"
import {React, useState, useEffect} from 'react'
import AddEventDetails from "./AddEventDetails"
import AddWorkoutDetails from "./AddWorkoutDetails"

export default function AddEvent({addOpen, setAddOpen}) {

    const[workoutDetails, setWorkoutDetails] = useState(false)
    const[workoutList, setWorkoutList] = useState([])

    const[detailButtonActive, setDetailButtonActive] = useState(true)
    const[workoutButtonActive, setWorkoutButtonActive] = useState(false)

    const handleClose = () => {
        setAddOpen(!addOpen)
        setWorkoutList([])
    }

    const handleButton1 = () => {
        if(workoutDetails && workoutButtonActive){
            setWorkoutDetails(!workoutDetails)
            setDetailButtonActive(!detailButtonActive)
            setWorkoutButtonActive(!workoutButtonActive)
        }

    }
    const handleButton2 = () => {
        if(!workoutDetails && detailButtonActive){
            setWorkoutDetails(!workoutDetails)
            setWorkoutButtonActive(!workoutButtonActive)
            setDetailButtonActive(!detailButtonActive)
        }
    }

    return (
        <div className={"add-event " + (addOpen && "active")}>
            <div className="topWrapper">
                <button className="eventButton" onClick={handleButton1}>Details</button>
                <button className="workoutButton" onClick={handleButton2}>Workout</button>
                <div className="closeMenu" onClick={handleClose}>
                    <span className="line1"></span>
                    <span className="line2"></span>
                </div>
            </div>
            <AddEventDetails workoutDetails={workoutDetails} setWorkoutDetails={setWorkoutDetails} setAddOpen={setAddOpen} addOpen={addOpen}/>
            <AddWorkoutDetails workoutList={workoutList} setWorkoutList={setWorkoutList} workoutDetails={workoutDetails} setWorkoutDetails={setWorkoutDetails} setAddOpen={setAddOpen} addOpen={addOpen}/>
            
        </div>
    )
}
