import {React, useState, useEffect} from "react"
import {Link} from "react-router-dom"
import "./EventContainer.scss"
import {useGlobalContext} from "../../store"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"

export default function EventContainer({id, setId, name, dateTime, darkmode}) {
    const {user, event, deleteEventQuery, currentUserEventQuery} =
        useGlobalContext()

    const handleEventDelete = () => {
        deleteEventQuery(id).then(() => {
            currentUserEventQuery()
        })
    }
    const [date, setDate] = useState(new Date())
    const [loading, setLoading] = useState(true)
    const [finishLoading, setFinishLoading] = useState(false)
    const [eventID, setEventID] = useState()

    useEffect(() => {
        if (id !== undefined) {
            for (var i = 0; i < user.data.events.length; i += 1) {
                if (id === user.data.events[i].id) {
                    setEventID(i)
                }
            }
            setDate(new Date(dateTime))
            // setEventID(user.data.events[id].id)
            setLoading(false)
        }
    }, [])

    return (
        <div class={"theme " + (darkmode ? "light" : "dark")}>
            <li className="eventbuttonWrapper">
                <Link
                    to={loading ? "/" : "/event" + eventID}
                    className="eventbutton"
                    onClick={() => setId(eventID)}
                >
                    <span>{id}</span>
                    <span>{name}</span>
                    <span>
                        {loading
                            ? "LOADING EVENTS: " + eventID
                            : (date.getMonth() < 10
                                  ? "0" + date.getMonth()
                                  : date.getMonth()) +
                              "-" +
                              (date.getDate() < 10
                                  ? "0" + date.getDate()
                                  : date.getDate()) +
                              "-" +
                              date.getFullYear() +
                              " " +
                              (date.getHours() < 10
                                  ? "0" + date.getHours()
                                  : date.getHours()) +
                              ":" +
                              (date.getMinutes() < 10
                                  ? "0" + date.getMinutes()
                                  : date.getMinutes())}
                    </span>
                </Link>
                <DeleteForeverIcon
                    className="trash"
                    onClick={handleEventDelete}
                />
            </li>
        </div>
    )
}
