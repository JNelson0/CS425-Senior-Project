import React, {useEffect, useState} from "react"
import {StandardLayout} from "../components"
import {Navigate} from "react-router"
import {useGlobalContext} from "../store"

const LoginPage = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("")
  const [password, setPassword] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

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
    // Only need to setLoading because we are not logged in.... Will have to trial and error
    setLoading(true)
    loginUserQuery({
      emailOrUsername,
      password,
    })
      .then(() => {
        setRedirectTo("/")
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
    <StandardLayout>
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
    </StandardLayout>
  )
}

export default LoginPage
