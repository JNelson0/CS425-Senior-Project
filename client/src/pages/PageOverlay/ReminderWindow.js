import {React, useState, useEffect} from "react"
import "./ReminderWindow.scss"
import {useGlobalContext} from "../../store"

export default function ReminderWindow({setBellOpen}) {
    const {user, getEventById, getUserById, getGroupById, userQuery} =
        useGlobalContext()

    const [error, setError] = useState()

    const [submit, setSubmit] = useState(false)

    useEffect(() => {
        if (submit) {
            ;(async () => {})()
                .catch(setError)
                .finally(() => {
                    setSubmit(false)
                    setBell(true)
                })
        }
    }, [submit])

    const [bell, setBell] = useState(false)
    useEffect(() => {
        if (bell) {
            ;(async () => {
                console.log(user.events)
                await userQuery(2)
                console.log(getUserById(2).email)
            })()
                .catch(setError)
                .finally(() => {
                    setBellOpen(false)
                    setBell(false)
                })
        }
    }, [bell])

    if (error) {
        return <>Error : {String(error)}</>
    }

    const handleSubmit = e => {
        e.preventDefault()
        setSubmit(true)
    }

    const events = user.events.map(e => getEventById(e))
    const hasEvents = events.every(v => v != null)

    for (const e of events) {
        let start = new Date(e.start)
        events.start = start.getMonth() + "/" + start.getDay()
    }

    return (
        <div className="reminderWindow">
            {hasEvents ? (
                <form>
                    <div className="list">
                        {events.map(e => (
                            <div className="element">
                                <input type="checkbox" />
                                <div>{e.title + " " + events.start}</div>
                            </div>
                        ))}
                    </div>
                    <button onClick={handleSubmit}>Submit</button>
                </form>
            ) : (
                <>Loading...</>
            )}
        </div>
    )
}
