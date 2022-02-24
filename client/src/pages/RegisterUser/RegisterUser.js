import "./RegisterUser.scss"
import {React, useState, useEffect} from "react"
import CloseIcon from '@mui/icons-material/Close';

export default function RegisterUser({registerOpen, setRegisterOpen}) {

    const [email, setEmail] = useState("")
    const [firstName, setFN] = useState("")
    const [lastName, setLN] = useState("")
    const [username, setUsername] = useState("")
    const [password1, setPassword1] = useState()
    const [password2, setPassword2] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const handleClose = () => {
        setRegisterOpen(!registerOpen)
    }
    const handleSubmit = () => {

    }

    const handleEmailChange = e => {
        setEmail(e.target.value)
    }
    const handleUsernameChange = e => {
        setUsername(e.target.value)
    }
    const handleFNChange = e => {
        setFN(e.target.value)
    }
    const handleLNChange = e => {
        setLN(e.target.value)
    }
    const handlePassword1Change = e => {
        setPassword1(e.target.value)
    }
    const handlePassword2Change = e => {
        setPassword2(e.target.value)
    }

    return (
        <div className={"register-user " + (registerOpen && "active")}>
            <div className="topbar"> 
                <div className="close" onClick={() => handleClose()}>
                    <CloseIcon sx={{fontSize: 33}} />
                </div>

                <div class = "textinput">
                    <form onSubmit={handleSubmit}>
                        <div id = "fnenter">
                            <label for="fn">First Name</label> 
                            <input
                                type="text"
                                id="fn"
                                value={firstName}
                                onChange={handleFNChange}
                            />
                        </div>
                        <div id = "lnenter">
                            <label for="ln">Last Name</label> 
                            <input
                                type="text"
                                id="ln"
                                value={lastName}
                                onChange={handleLNChange}
                            />
                        </div>
                    
                        <div id = "emailenter">
                            <label for="email">Email</label> 
                            <input
                                type="text"
                                id="email"
                                value={email}
                                onChange={handleEmailChange}
                            />
                        </div>
                        <div id = "usernameenter">
                            <label for="name">Username</label> 
                            <input
                                type="text"
                                id="name"
                                value={username}
                                onChange={handleUsernameChange}
                                autocomplete="off"
                            />
                        </div>

                        <div id = "passenter1">
                            <label for="pass1">Password</label>
                            <input
                                type="password"
                                id="pass1"
                                value={password1}
                                onChange={handlePassword1Change}
                                autocomplete="off"
                            />
                        </div>
                        <div id = "passenter2">
                            <label for="pass2">Verify Password</label>
                            <input
                                type="password"
                                id="pass2"
                                value={password2}
                                onChange={handlePassword2Change}
                                autocomplete="off"
                            />
                        </div>
                    </form>
                </div>     
            </div>
            <div className="input">

            </div>
        </div>
    )
}