import {React, useState, useEffect} from "react"
import {Link} from "react-router-dom"
import "./EventContainer.scss"
import {useGlobalContext} from "../../store"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import AssignID from "./AssignID.js"

export default function EventContainer({id, setId, name, date, darkmode}) {
    const {user, isLoggedIn, deleteEventQuery, currentUserEventQuery} =
        useGlobalContext()

    const handleEventDelete = () => {
        deleteEventQuery(id).then(() => {
            currentUserEventQuery()
        })
    }

    const [eventID, setEventID] = useState()

    return (
        <div class={"theme " + (darkmode ? "light" : "dark")}>
            <AssignID id={id} setEventID={setEventID} />
            <li className="eventbuttonWrapper">
                <Link
                    to={"/event" + eventID}
                    className="eventbutton"
                    onClick={() => setId(eventID)}
                >
                    <span>{id}</span>
                    <span>{name}</span>
                    <span>
                        {(date.getMonth() < 10
                            ? "0" + (date.getMonth() + 1)
                            : date.getMonth() + 1) +
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
