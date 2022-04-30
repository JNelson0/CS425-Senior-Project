import {React, useState, useEffect} from "react"
import {Link} from "react-router-dom"
import "./EventContainer.scss"
import {useGlobalContext} from "../../store"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"

export default function EventContainer({
    index,
    key,
    id,
    setId,
    name,
    date,
    darkmode,
    setEventId,
    eventId,
}) {
    const {user, deleteEventQuery} = useGlobalContext()

    const handleEventDelete = () => {
        deleteEventQuery(id)
    }
    return (
        <div class={"theme " + (darkmode ? "light" : "dark")}>
            <div className="eventbuttonWrapper">
                {/* <Link
                    to={"/event" + id}
                    className="eventbutton"
                    onClick={() => setId(id)}
                > */}
                <div
                    className="eventButton"
                    onClick={() => setEventId({index, id})}
                >
                    {/* <span>{id}</span> */}
                    <div className="wrapper">
                        <span>{name}</span>
                        {eventId ? (
                            <></>
                        ) : (
                            <span>
                                {(date.getMonth() < 10
                                    ? "0" + (date.getMonth() + 1)
                                    : date.getMonth() + 1) +
                                    "-" +
                                    (date.getDate() < 10
                                        ? "0" + date.getDate()
                                        : date.getDate()) +
                                    " " +
                                    (date.getHours() < 10
                                        ? "0" + date.getHours()
                                        : date.getHours()) +
                                    ":" +
                                    (date.getMinutes() < 10
                                        ? "0" + date.getMinutes()
                                        : date.getMinutes())}
                            </span>
                        )}
                    </div>
                    {/* <div className={"line " + (darkmode ? "light" : "dark")} /> */}
                </div>
                {/* </Link> */}
                {/* <DeleteForeverIcon
                    className="trash"
                    onClick={handleEventDelete}
                /> */}
            </div>
        </div>
    )
}
