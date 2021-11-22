import React, {useEffect, useState} from "react"
import {StandardLayout} from "../components"
import {useGlobalContext} from "../store"
import {Navigate} from "react-router"

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState()
  const [passwordConfirmation, setPasswordConfirmation] = useState()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  const [redirectTo, setRedirectTo] = useState()

  const {createUserQuery, isLoggedIn} = useGlobalContext()

  const handleEmailChange = e => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = e => {
    setPassword(e.target.value)
  }

  const handlePasswordConfirmationChange = e => {
    setPasswordConfirmation(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()

    if (password !== passwordConfirmation) {
      alert("Passwords don't match.")
      return
    }

    setLoading(true)
    createUserQuery({
      email,
      password,
      passwordConfirmation,
      firstName: "Charles",
      lastName: "Pezeshki",
      username: "laknsdflkn" + Math.random(),
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
          onChange={handleEmailChange}
        />
        <input
          type="password"
          placeholder="Enter password"
          onChange={handlePasswordChange}
        />
        <input
          type="password"
          placeholder="Confirm password"
          onChange={handlePasswordConfirmationChange}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
    </StandardLayout>
  )
}

export default LoginPage
