import {React, useState, useEffect} from "react"
import {Link} from "react-router-dom"
import "./EventContainer.scss"
import {useGlobalContext} from "../../store"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"

export default function EventContainer({id, setId, name, date, darkmode}) {
    const {user, deleteEventQuery} = useGlobalContext()

    const handleEventDelete = () => {
        deleteEventQuery(id)
    }

    return (
        <div class={"theme " + (darkmode ? "light" : "dark")}>
            <li className="eventbuttonWrapper">
                <Link
                    to={"/event" + id}
                    className="eventbutton"
                    onClick={() => setId(id)}
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
