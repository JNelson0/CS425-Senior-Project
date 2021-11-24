import React from 'react'
import {Link} from 'react-router-dom'
import "./EventContainer.scss"

export default function EventContainer({whereTo, active, setSelected, id, name, dateTime}) {
    return (
        <li  className="eventbuttonWrapper">
            <Link to={whereTo} className={active? "eventbutton active": "eventbutton"} onClick={() => setSelected(id)}>
                <span>{name}</span>
                <span>{dateTime}</span>
            </Link>
        </li>
    )
}
