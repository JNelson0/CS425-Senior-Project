import {React, useState, useEffect} from "react"

import "./AddEventDetails.scss"
import TextField from "@mui/material/TextField"
import {useGlobalContext} from "../../store"

export default function AddEventDetails({
    setAddOpen,
    addOpen,
    workoutDetails,
    setWorkoutDetails,
    type,
    setType,
    workoutDetailsList,
    setWorkoutDetailsList,
    startDate,
    finishDate,
}) {
    const {createEventQuery, currentUserEventQuery} = useGlobalContext()

    //ALL DATES AND TIMES NEED TO BE OF TYPE "05 October 2011 14:48 UTC"

    const exercises = [
        {
            type: "WEIGHTS",
            name: "name",
            sets: 4,
            reps: 4,
        },
    ]

    const handleChange = e => {
        setWorkoutDetailsList({
            ...workoutDetailsList,
            [e.target.name]: e.target.value,
        })
    }

    return (
        <div className="eventDetails">
            <div className="form">
                <div className="list">
                    <div>
                        <label>Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={workoutDetailsList.title}
                            onChange={handleChange}
                            placeholder="Enter Event Title"
                            required
                        />
                    </div>
                    <div className="description">
                        <label>Description:</label>
                        <textarea
                            type="text"
                            name="description"
                            value={workoutDetailsList.description}
                            onChange={handleChange}
                            placeholder="Enter Event Description"
                            required
                        />
                    </div>
                    <div className="type">
                        <label>Type:</label>
                        <select
                            value={workoutDetailsList.type}
                            onChange={handleChange}
                            placeholder="Choose an Option"
                            name="type"
                        >
                            <option value="STANDARD">Event</option>
                            <option value="WORKOUT">Workout</option>
                        </select>
                    </div>
                    <div className="date">
                        <TextField
                            name="start"
                            id="datetime-local"
                            label="Start Time"
                            type="datetime-local"
                            defaultValue={startDate}
                            value={workoutDetailsList.start}
                            sx={{width: 250}}
                            onChange={handleChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            name="finish"
                            id="datetime-local"
                            label="End Time"
                            type="datetime-local"
                            defaultValue={finishDate}
                            value={workoutDetailsList.finish}
                            sx={{width: 250}}
                            onChange={handleChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
