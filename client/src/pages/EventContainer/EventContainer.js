import React from 'react'
import {Link} from 'react-router-dom'
import "./EventContainer.scss"
import {useGlobalContext} from "../../store"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function EventContainer({whereTo, active, setSelected, id, name, dateTime}) {
    const {deleteEventQuery, currentUserEventQuery} = useGlobalContext()
    const handleEventDelete = () => {
        deleteEventQuery(id)
        currentUserEventQuery()
    }

    return (
        <li  className="eventbuttonWrapper">
            <Link to={whereTo} className={active? "eventbutton active": "eventbutton"} onClick={() => setSelected(id)}>
                <span>{id}</span>
                <span>{name}</span>
                <span>{dateTime}</span>
            </Link>
            <DeleteForeverIcon className="trash" onClick={handleEventDelete} />
        </li>
    )
}
