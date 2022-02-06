import {useEffect, useMemo, useState} from "react"
import {useGlobalContext} from "../store/global"

const TestPage = ({bla}) => {
  const {
    loginUserQuery,
    userQuery,
    createEventQuery,
    currentUserEventQuery,
    deleteUserQuery,
    modifyUserQuery,
    eventFromIdQuery,
    deleteEventQuery,
    modifyEventQuery,
    currentUserQuery,
    getExercisesFromEventIdQuery,
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
      console.log("loginUserQuery start")
      await loginUserQuery({
        emailOrUsername: "username",
        password: "password",
      })
      console.log("loginUserQuery done")

      console.log("currentUserQuery start")
      await currentUserEventQuery()
      console.log("currentUserQuery done")

      console.log("getExerciseFromEventQuery start")
      await getExercisesFromEventIdQuery(11)
      console.log("getExerciseFromEventQuery done")

      // await currentUserQuery()
      // console.log("createEventQuery start")
      // await createEventQuery({
      //   title: "Standard",
      //   description: "This is a Standard Event",
      //   type: "STANDARD",
      //   start: Date.now(),
      //   finish: Date.now() + 30 * 60000,
      // })
      // console.log("createEventQuery done")
      // console.log("currentUserEventQuery start")
      // await currentUserEventQuery()
      // console.log("currentUserEventQuery done")
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
