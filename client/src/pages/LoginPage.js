import React, {useEffect, useState} from "react"
import {StandardLayout} from "../components"
import {useNewUser} from "../hooks"

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState()
  const [passwordConfirmation, setPasswordConfirmation] = useState()

  const {request, data, error, loading} = useNewUser()

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

    // if (password !== passwordConfirmation) {
    //   alert("Passwords don't match.")
    //   return
    // }

    request({
      email,
      password,
      passwordConfirmation,
      firstName: "Conor",
      lastName: "Pezeshki",
      username: "condog" + Math.random(),
    })
  }

  return (
    <StandardLayout>
      {error && <div>{error.message}</div>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
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
