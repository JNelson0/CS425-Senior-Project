import "./AddEvent.scss"
import {useGlobalContext} from "../../store"
import {React, useState, useEffect} from 'react'

export default function AddEvent({addOpen, setAddOpen}) {
    const {createEventQuery, currentUserEventQuery} = useGlobalContext()

    const [state, setState] = useState({
        title: "",
        description: "",
        type: "",
        start: "",
        finish: "",
    })

    const handleChange = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    }
    
    const resetInput = () => {
        setState({
            title: "",
            description: "",
            type: "",
            start: "",
            finish: "",
        })
    }

    const handleSubmit = () => {
        const title = state.title
        const description = state.description
        const type = state.type
        const start = state.start
        const finish = state.finish
        setAddOpen(!addOpen)
        createEventQuery({title, description, type, start, finish,})
        setState({
            title: "",
            description: "",
            type: "",
            start: "",
            finish: "",
        })
        currentUserEventQuery()
    }

    return (
        <div className={"add-event " + (addOpen && "active")}>
            <div className="closeWrapper">
                <div className="closeMenu" onClick={() => setAddOpen(!addOpen)}>
                    <span className="line1"></span>
                    <span className="line2"></span>
                </div>
            </div>
            <div className="listWrapper">

                <ul>
                    <li>
                        <form>
                            <label>
                                Event Title: <input type="text" name="title" value={state.title} onChange={handleChange} />
                            </label>
                        </form>
                    </li>
                    <li>
                        <form>
                            <label>
                                Event Description: <input type="text" name="description" value={state.description} onChange={handleChange} />
                            </label>
                        </form>
                    </li>
                    <li>
                        <form>
                            <label>
                                Event Type: <input type="text" name="type" value={state.type} onChange={handleChange} />
                            </label>
                        </form>
                    </li>
                    <li>
                        <form>
                            <label>
                                Event Start Time: <input type="text" name="start" value={state.start} onChange={handleChange} />
                            </label>
                        </form>
                    </li>
                    <li>
                        <form>
                            <label>
                                Event Finish Time: <input type="text" name="finish" value={state.finish} onChange={handleChange}/>
                            </label>
                        </form>
                    </li> 
                </ul>
            </div>
            <div className="buttonWrapper">
                <button onClick={resetInput}>Clear</button>
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    )
}
