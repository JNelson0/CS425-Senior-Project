import "./AddEvent.scss"
import {useGlobalContext} from "../../store"
import {React, useState, useEffect} from 'react'

export default function AddEvent({addOpen, setAddOpen}) {
    const {createEventQuery, currentUserEventQuery} = useGlobalContext()

    const[title, setTitle] = useState("")
    const[description, setDescription] = useState("")
    const[type, setType] = useState("")
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

    const handleSubmit = () => {
        setAddOpen(!addOpen)
        createEventQuery({title, description, type, start, finish})
        resetInput()
    }

    return (
        <div className={"add-event " + (addOpen && "active")}>
            <div className="closeWrapper">
                <div className="closeMenu" onClick={() => setAddOpen(!addOpen)}>
                    <span className="line1"></span>
                    <span className="line2"></span>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="listWrapper">

                    <ul>
                        <li>
                            <label>
                                Event Title: <input type="text" name="title" value={title} onChange={handleTitle} />
                            </label>
                        </li>
                        <li>
                            <label>
                                Event Description: <input type="text" name="description" value={description} onChange={handleDescription} />
                            </label>
                        </li>
                        <li>
                            <label>
                                Event Type: <input type="text" name="type" value={type} onChange={handleType} />
                            </label>
                        </li>
                        <li>
                            <label>
                                Event Start Time: <input type="text" name="start" value={start} onChange={handleStart} />
                            </label>
                        </li>
                        <li>
                            <label>
                                Event Finish Time: <input type="text" name="finish" value={finish} onChange={handleFinish}/>
                            </label>
                        </li> 
                    </ul>
                </div>
                <div className="buttonWrapper">
                    <button onClick={resetInput}>Clear</button>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}
