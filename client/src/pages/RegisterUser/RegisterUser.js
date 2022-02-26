import "./RegisterUser.scss"
import {React, useState, useEffect} from "react"
import CloseIcon from "@mui/icons-material/Close"
import {useGlobalContext} from "../../store"
import {Navigate} from "react-router"

export default function RegisterUser({registerOpen, setRegisterOpen}) {
    const [email, setEmail] = useState("")
    const [firstName, setFN] = useState("")
    const [lastName, setLN] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword1] = useState("")
    const [passwordConfirmation, setPassword2] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const [redirectTo, setRedirectTo] = useState()

    const {createUserQuery, isRegistered} = useGlobalContext()

    const handleClose = () => {
        setRegisterOpen(!registerOpen)
    }

    const handleSubmit = e => {
        e.preventDefault()
        // Only need to setLoading because we are not logged in.... Will have to trial and error
        setLoading(true)
        createUserQuery({
            email,
            password,
            passwordConfirmation,
            firstName,
            lastName,
            username,
        })
            .then(() => {
                setRedirectTo("/dashboard")
            })
            .catch(e => {
                if (e.message.search("email")) {
                    setError(Error("Email Taken"))
                } else if (e.message.search("username")) {
                    setError(Error("UserName taken"))
                }
            })
            .finally(() => {
                setLoading(false)
            })
    }

    // if (error) {
    //     console.log(error)
    // }

    if (redirectTo) {
        return <Navigate to={redirectTo} />
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
        <div>
            <div className={"register-user " + (registerOpen && "active")}>
                <div className="topbar">
                    <label id="title">Register </label>
                    <div id="close" onClick={() => handleClose()}>
                        <CloseIcon sx={{fontSize: 33}} />
                    </div>
                </div>
                <div class="textinput">
                    <form onSubmit={handleSubmit}>
                        <div id="fnenter">
                            <label for="fn">First Name</label>
                            <input
                                type="text"
                                id="fn"
                                value={firstName}
                                onChange={handleFNChange}
                            />
                        </div>

                        <div id="lnenter">
                            <label for="ln">Last Name</label>
                            <input
                                type="text"
                                id="ln"
                                value={lastName}
                                onChange={handleLNChange}
                            />
                        </div>

                        <div id="emailenter">
                            <label for="email">Email</label>
                            <input
                                type="text"
                                id="email"
                                value={email}
                                onChange={handleEmailChange}
                            />
                        </div>

                        <div id="usernameenter">
                            <label for="name">Username</label>
                            <input
                                type="text"
                                id="name"
                                value={username}
                                onChange={handleUsernameChange}
                                autocomplete="chrome-off"
                            />
                        </div>

                        <div id="passenter1">
                            <label for="pass1">Password</label>
                            <input
                                type="password"
                                id="pass1"
                                value={password}
                                onChange={handlePassword1Change}
                                autocomplete="new-password"
                            />
                        </div>

                        <div id="passenter2">
                            <label for="pass2">Re-enter Password</label>
                            <input
                                type="password"
                                id="pass2"
                                value={passwordConfirmation}
                                onChange={handlePassword2Change}
                                autocomplete="new-password"
                            />
                        </div>

                        <div id="registeruser">
                            <button type="submit" disabled={loading}>
                                {loading ? "Loading..." : "Register"}
                            </button>
                        </div>

                        <div id="error">
                            {error != undefined ? (
                                <div>{error.message}</div>
                            ) : (
                                <div />
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
