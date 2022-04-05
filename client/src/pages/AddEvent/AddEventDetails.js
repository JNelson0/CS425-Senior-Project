import {React, useState, useEffect} from "react"

import "./AddEventDetails.scss"
import TextField from "@mui/material/TextField"
import {useGlobalContext} from "../../store"
import "../../_theme.scss";

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
    darkmode
}) {
    const {createEventQuery, currentUserEventQuery} = useGlobalContext()

    //ALL DATES AND TIMES NEED TO BE OF TYPE "05 October 2011 14:48 UTC"

    const handleChange = e => {
        setWorkoutDetailsList({
            ...workoutDetailsList,
            [e.target.name]: e.target.value,
        })
    }

    return (
        <div class={"theme " + (darkmode ? "light" : "dark")}>
            <div className="eventDetails">
                <div className="form">
                    <div className="list">
                        <div className={"title " + (darkmode ? "light" : "dark")}>
                            <label>Title</label>
                            <input
                                type="text"
                                name="title"
                                value={workoutDetailsList.title}
                                onChange={handleChange}
                                placeholder="Enter Event Title"
                                required
                            />
                        </div>
                        <div className={"description " + (darkmode ? "light" : "dark")}>
                            <label>Description</label>
                            <textarea
                                type="text"
                                name="description"
                                value={workoutDetailsList.description}
                                onChange={handleChange}
                                placeholder="Enter Event Description"
                                required
                            />
                        </div>
                        <div className={"type " + (darkmode ? "light" : "dark")}>
                            <label>Type</label>
                            <select
                                value={workoutDetailsList.type}
                                onChange={handleChange}
                                placeholder="Choose an Option"
                                name="type"
                                required
                            >
                                <option value="STANDARD">EVENT</option>
                                <option value="WORKOUT">WORKOUT</option>
                            </select>
                        </div>
                        <div className={"date " + (darkmode ? "light" : "dark")}>
                            <TextField
                                name="start"
                                id="datetime-local"
                                label="Start Time"
                                type="datetime-local"
                                defaultValue={startDate}
                                value={workoutDetailsList.start}
                                sx={{
                                    //color: "white",
                                    width: 250
                                }}
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
        </div>
    )
}
