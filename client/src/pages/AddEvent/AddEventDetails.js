
import {React, useState, useEffect} from 'react'

import "./AddEventDetails.scss"
import TextField from '@mui/material/TextField';
import {useGlobalContext} from "../../store"


export default function AddEventDetails({setAddOpen, addOpen, workoutDetails, setWorkoutDetails}) {
    const {createEventQuery, currentUserEventQuery} = useGlobalContext()

    const[loading, setLoading] = useState(false)

    const[title, setTitle] = useState("")
    const[description, setDescription] = useState("")
    const[type, setType] = useState("STANDARD")
    //ALL DATES AND TIMES NEED TO BE OF TYPE "05 October 2011 14:48 UTC"
    const[start, setStart] = useState("")
    const[finish, setFinish] = useState("")


    const handleTitle = e => {
        setTitle(e.target.value)
    }
    const handleDescription = e => {
        setDescription(e.target.value)
    }
    const handleType = e => {
        setType(e.target.value)
    }
    const handleStart = e => {
        setStart(e.target.value)
    }
    const handleFinish = e => {
        setFinish(e.target.value)
    }
    
    const resetInput = () => {
        setTitle("")
        setDescription("")
        setType("")
        setStart("")
        setFinish("")
    }

    const handleSubmit = e => {
        e.preventDefault();
        setAddOpen(!addOpen)
        createEventQuery({title, description, type, start, finish})
        resetInput()
        setLoading(true)
        currentUserEventQuery()
        setLoading(false)
    }
  return (
    
    <div className={workoutDetails === false ? "eventDetails" : "eventDetails notActive"}>
                <form onSubmit={handleSubmit}>
                    <div className="list">
                        <div>
                            <label>
                                Title: 
                            </label>
                            <input type="text" name="title" value={title} onChange={handleTitle} placeholder="Enter Event Title"/>
                        </div>
                        <div className="description">
                            <label>
                                Description:
                            </label>
                            <textarea type="text" name="description" value={description} onChange={handleDescription} placeholder="Enter Event Description" />
                        </div>
                        <div className="type">
                            <label>
                                Type: 
                            </label>
                            <select value={type} onChange={handleType} placeholder="Choose an Option">
                                <option value="STANDARD">Event</option>
                                <option value="WORKOUT">Workout</option>
                            </select>
                        </div>
                        <div className="date">
                            <TextField
                                id="datetime-local"
                                label="Start Time"
                                type="datetime-local"
                                defaultValue="2017-05-24T10:30"
                                sx={{ width: 250}}
                                onChange={handleStart}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                id="datetime-local"
                                label="End Time"
                                type="datetime-local"
                                defaultValue="2017-05-24T10:30"
                                sx={{ width: 250 }}
                                onChange={handleFinish}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </div>
                    </div>
                <div className="buttonWrapper">
                    <button type="reset" onClick={resetInput} >Clear</button>
                    <button type="submit">Submit</button>
                </div>
            </form>
    </div>
  );
}


