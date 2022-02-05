import {useEffect, useMemo, useState} from "react"
import {useGlobalContext} from "../store/global"

const TestPage = ({bla}) => {
  const {
    createUserQuery,
    userState,
    eventState,
    groupState,
    exerciseState,
    exerciseResponseState,
  } = useGlobalContext()

  const userId = useMemo(() => Math.floor(Math.random() * 10000), [])

  useEffect(() => {
    console.log("Starting testing!")
    ;(async () => {
      console.log("createUserQuery start")
      await createUserQuery({
        email: userId + "email@email.com",
        password: "password",
        passwordConfirmation: "password",
        firstName: "John",
        lastName: "Doe",
        username: userId + "username",
      })
      console.log("createUserQuery done")
    })().catch(error => {
      console.error("Error occurred while testing...", error)
    })
  }, [])

  useEffect(() => {
    console.log("userState:", userState)
  }, [userState])

  useEffect(() => {
    console.log("eventState:", eventState)
  }, [eventState])

  useEffect(() => {
    console.log("groupState:", groupState)
  }, [groupState])

  useEffect(() => {
    console.log("exerciseState:", exerciseState)
  }, [exerciseState])

  useEffect(() => {
    console.log("exerciseResponseState:", exerciseResponseState)
  }, [exerciseResponseState])

  return <>Testing...</>
}

export default TestPage
