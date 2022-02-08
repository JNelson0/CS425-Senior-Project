import {React, useState} from 'react'
import {Link} from 'react-router-dom'
import "./EventContainer.scss"
import {useGlobalContext} from "../../store"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function EventContainer({id, setId, name, dateTime, darkmode}) {

    const {deleteEventQuery, currentUserEventQuery} = useGlobalContext()

    const handleEventDelete = () => {
        deleteEventQuery(id)
            .then(() => {currentUserEventQuery()})
    }

    return (
        <div class={"theme " + (darkmode ? "light" : "dark")}>
            <li  className="eventbuttonWrapper">
            <Link to={"/event"+id} className="eventbutton" onClick={() => setId(id)}>
                <span>{id}</span>
                <span>{name}</span>
                <span>{dateTime}</span>
            </Link>
            <DeleteForeverIcon className="trash" onClick={handleEventDelete} />
         
            </li>
        </div>
        
    )
}
