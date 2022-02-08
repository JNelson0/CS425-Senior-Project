import React, {useEffect, useState} from "react"
import {StandardLayout} from "../components"
import {Navigate} from "react-router"
import {useNavigate} from "react-router"
import {useGlobalContext} from "../store"
import "./LoginPage.scss"
import {dividerClasses} from "@mui/material"
import BackgroundIGM from "../img/university-background.png"

const LoginPage = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const [redirectTo, setRedirectTo] = useState()
  const {loginUserQuery, isLoggedIn} = useGlobalContext()
  const navigate = useNavigate()

  const handleEmailOrUsernameChange = e => {
    setEmailOrUsername(e.target.value)
  }

  const handlePasswordChange = e => {
    setPassword(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    // Only need to setLoading because we are not logged in.... Will have to trial and error
    setLoading(true)
    console.log("Email")
    console.log(emailOrUsername)
    console.log(password)
    loginUserQuery({
      emailOrUsername,
      password,
    })
      .then(() => {
        // console.log(isLoggedIn)
        setRedirectTo("/dashboard")
        // console.log("TIME TO NAVIGATE")
      })
      .catch(error => {
        setLoading(false)
        setError(error)
      })
  }

  if (redirectTo) {
    return <Navigate to={redirectTo} />
  }

  return (
    <div className="loginpage">
      <div className="underlay">
        <img id="img" src={BackgroundIGM} alt="backg" />
      </div>
      <div className="inputform">
        {error && <div>{error.message}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter email"
            value={emailOrUsername}
            onChange={handleEmailOrUsernameChange}
          />
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={handlePasswordChange}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
    // {error && <div>{error.message}</div>}
  )
}

export default LoginPage
