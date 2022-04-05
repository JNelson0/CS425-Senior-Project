import {React, useState, useEffect} from "react"
import {Link} from "react-router-dom"
import "./GroupContainer.scss"
import {useGlobalContext} from "../../store"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"

export default function GroupContainer({id, setId, name, darkmode}) {
    const {user} = useGlobalContext()

    return (
        <div class={"theme " + (darkmode ? "light" : "dark")}>
            <div className={"container " + (darkmode ? "light" : "dark")}>
                <li className="groupbuttonWrapper">
                    <Link
                        to={"/groups" + id}
                        className={"groupbutton " + (darkmode ? "light" : "dark")}
                        onClick={() => setId(id)}
                    >
                        {/* <span>{id}:</span> */}
                        <span>{name}</span>
                    </Link>
                    
                    
                    {/* <DeleteForeverIcon
                        className="trash"
                        onClick={handleEventDelete}
                    /> */}
                </li>
            </div>
        </div>
    )
}
