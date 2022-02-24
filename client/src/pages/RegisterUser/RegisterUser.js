import "./RegisterUser.scss"
import {React, useState, useEffect} from "react"
import CloseIcon from '@mui/icons-material/Close';

export default function RegisterUser({registerOpen, setRegisterOpen}) {
    const handleClose = () => {
        setRegisterOpen(!registerOpen)
    }

    return (
        <div className={"register-user " + (registerOpen && "active")}>
            <div className="topbar"> 
                <div className="close" onClick={() => handleClose()}>
                    <CloseIcon sx={{fontSize: 33}} />
                </div>
            </div>
            <div className="input">

            </div>
        </div>
    )
}