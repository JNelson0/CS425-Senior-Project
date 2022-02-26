import React, {useEffect, useState} from "react"
import {Navigate} from "react-router"
import {useGlobalContext} from "../store"
import "./LoginPage.scss"
import BackgroundIGM from "../img/university-background.png"
import "./RegisterUser/RegisterUser.js"
import RegisterUser from "./RegisterUser/RegisterUser.js"

const LoginPage = () => {
    const [emailOrUsername, setEmailOrUsername] = useState("")
    const [password, setPassword] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const [registerOpen, setRegisterOpen] = useState(false)


    const [redirectTo, setRedirectTo] = useState()

    const {loginUserQuery, isLoggedIn} = useGlobalContext()

    const handleEmailOrUsernameChange = e => {
        setEmailOrUsername(e.target.value)
    }

    const handlePasswordChange = e => {
        setPassword(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault()
        setLoading(true)
        loginUserQuery({
            emailOrUsername,
            password,
        })
            .then(() => {
                setRedirectTo("/dashboard")
            })
            .catch(setError)
            .finally(() => {
                setLoading(false)
            })
    }

    if (redirectTo) {
        return <Navigate to={redirectTo} />
    }

  return (
    <div class = "loginpage">
      <div class = "underlay">
        <img id= "img" src={BackgroundIGM} alt="backg" />
      </div>

      <RegisterUser registerOpen={registerOpen} setRegisterOpen={setRegisterOpen} />
      
      <div class = "inputbox">
        <div class = "textinput">
          <form onSubmit={handleSubmit}>

            <div id = "emailenter">
              <label for="name">Username or Email</label> 
              <input
                type="text"
                id="name"
                value={emailOrUsername}
                onChange={handleEmailOrUsernameChange}
              />
            </div>

            <div id="passenter">
                <label for="pass">Password</label>
                <input
                    type="password"
                    id="pass"
                    value={password}
                    onChange={handlePasswordChange}
                />
            </div>

            <div id="loginbutton">
                <button type="submit" disabled={loading}>
                    {loading ? "Loading..." : "Login"}
                </button>
            </div>

            <div id="error">
                {error && <div>{error.message}</div>}
            </div>

          </form>

          <div id= "registerbutton">
            <button id="addButton" onClick={() => setRegisterOpen(!registerOpen)}>
              Register
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default LoginPage
