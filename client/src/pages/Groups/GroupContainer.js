import {React, useState, useEffect} from "react"
import {Link} from "react-router-dom"
import "./GroupContainer.scss"
import {useGlobalContext} from "../../store"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"

export default function GroupContainer({id, setId, name, darkmode}) {
    const {user} = useGlobalContext()

    return (
        <div class={"theme " + (darkmode ? "light" : "dark")}>
            <li className="groupbuttonWrapper">
                <Link
                    to={"/event" + id}
                    className="groupbutton"
                    onClick={() => setId(id)}
                >
                    <span>{id}</span>
                    <span>{name}</span>
                </Link>
                
                
                {/* <DeleteForeverIcon
                    className="trash"
                    onClick={handleEventDelete}
                /> */}
            </li>
        </div>
    )
}
