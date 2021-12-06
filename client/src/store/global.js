import {useState, useCallback} from "react"
import constate from "constate"
import {ApiError} from "../errors"
import { typographyVariant } from "@mui/system"

async function request(...args) {

  return fetch(...args).then(async res => {
    // res.ok === 200-299 HTTP Status Code
    if (res.ok) {
      return res.json()
    } else {
      throw ApiError.fromObject(await res.json())
    }
  })
}

function standardJsonInit(method, body) {
  return {
    method,
    headers: {"Content-Type": "application/json"},
    credentials: "include",
    body: JSON.stringify(body),
  }
}

function useGlobal() {
  const [userState, setUserState] = useState({})
  const [eventState, setEventState] = useState({})
  const [groupState, setGroupState] = useState({})
  const [exerciseState, setExerciseState] = useState({})
  const [exerciseResponseState, setExerciseResponseState] = useState({})

  const [currentUserId, setCurrentUserId] = useState()
  // Setters for Error and Data

  // These should be used to reflect the state changes inside the queries.
  // All states have the following 3 states loading, data, error

  // This happens on the first query
  // loading -> data
  // loading -> error

  // This happens when retry a failed query
  // error -> loading

  function createDataSetter(stateSetter) {
    return (id, data) => {
      stateSetter(prev => ({...prev, [id]: {data}}))
    }
  }

  function createErrorSetter(stateSetter) {
    return (id, error) => {
      stateSetter(prev => ({...prev, [id]: {error}}))
    }
  }

  const setUserData = createDataSetter(setUserState)
  const setUserError = createErrorSetter(setUserState)

  const setEventData = createDataSetter(setEventState)
  const setEventError = createErrorSetter(setEventState)

  const setGroupData = createDataSetter(setGroupState)
  const setGroupError = createErrorSetter(setGroupState)

  const setExerciseData = createDataSetter(setExerciseState)
  const setExerciseError = createErrorSetter(setExerciseState)

  const setExerciseResponseData = createDataSetter(setExerciseResponseState)
  const setExerciseResponseError = createErrorSetter(setExerciseResponseState)

  // Getters

  // Getters are exported and should be used for all state retrieval
  // IMPORTANT!!!: You should be able to find everything by starting at the user.
  // You should never have to read the response of a query directly. Use the getters.

  function createGetter(state) {
    return id => {
      const {data, error} = state[id] ?? {}

      return {
        data,
        error,
        loading: data == null && error == null,
      }
    }
  }

  const getUserById = createGetter(userState)
  const getEventById = createGetter(eventState)
  const getGroupById = createGetter(groupState)
  const getExerciseById = createGetter(exerciseState)
  const getExerciseResponseById = createGetter(exerciseResponseState)

  const user = getUserById(currentUserId)
  const event = getEventById(eventState)
  const isLoggedIn = Boolean(user)

  //

  // Queries available to the client

  //

  // GET /users/:userId
  async function userQuery(id) {
    try {
      const data = await request(`/users/${id}`, {credentials: "include"})
      setUserData(id, data)
    } catch (error) {
      setUserError(id, error)
    }
  }

  // GET /users/me
  async function currentUserQuery() {
    try {
      const data = await request("/users/me", {credentials: "include"})
      setUserData(data.id, data)
      setCurrentUserId(data.id)
    } catch (error) {
      setUserError(currentUserId, error)
    }
  }

  // POST /user
  // NOTE: Must be caught outside
  async function createUserQuery(options) {
    const data = await request("/user", standardJsonInit("POST", options))
    setUserData(data.id, data)
    setCurrentUserId(data.id)
  }

  // POST /user/login
  // NOTE: Must be caught outside
  async function loginUserQuery(options) {
    console.log(options)
    const data = await request("/user/login", standardJsonInit("POST", options))
    console.log(data)
    setUserData(data.id, data)
    setCurrentUserId(data.id)
  }

  // PUT /users/me/update
  async function modifyUserQuery(options) {
    try {
      const data = await request(
        "/users/me/update",
        standardJsonInit("PUT", options),
      )
      setUserData(currentUserId, data)
    } catch (error) {
      setUserError(currentUserId, error)
    }
  }

  // DELETE /users/me
  async function deleteUserQuery(options) {
    try {
      await request("/users/me", {method: "DELETE", credentials: "include"})
      setUserData(currentUserId, undefined)
    } catch (error) {
      setUserError(currentUserId, error)
    }
  }

  // GET /events/:eventId/exercises
  async function getEventExercisesQuery(id) {
    try {
      const data = await request("/events/:eventId/exercises", {
        method: "DELETE",
        credentials: "include",
      })

      for (const exercise of data) {
        setExerciseData(exercise.id, exercise)
      }
      setUserData(currentUserId, {...user.data, events: data.map(v => v.id)})
    } catch (error) {
      setUserError(currentUserId, error)
    }
  }

  // Queries TODO...

  // WIll have to reference schema to figure out relations

  // POST /event EASY
  async function createEventQuery(options) {
    try{
      console.log(JSON.stringify(options))
      const data = await request("/event", standardJsonInit("POST", options))
      console.log(data)
      for (const event of data){
        setEventData(event, event)
      }
      setUserData(currentUserId, {...user.data, events: data.map(v => v)})
    }
    catch(error){
      setEventError(eventState, error)
    }
  }

  // GET /events MEDIUM User & Event must be updated
  async function currentUserEventQuery() {
    try{
      const data = await request("/events", {credentials: "include"})
      for (const event of data){
        setEventData(event, event)
      }
      setUserData(currentUserId, {...user.data, events: data.map(v => v)})
      
    }catch(error){
      setEventError(eventState, error)
    }
  }

  //GET /events/:eventId Specific User Event
  async function eventFromIdQuery(id) {
    try{
      const data = await request(`/events/${id}`, {credentials: "include"})
      console.log(data)
      setEventData(event, data)     
    }catch(error){
      setEventError(eventState, error)
    }
  }

  // PUT /events/:eventId EASY
  async function modifyEventQuery(id, options){
    try{
      const data = await request(`/events/${id}`, standardJsonInit("PUT", options))
      setEventData(event[id], data)
      setUserData(currentUserId, {...user.data, events: data.map(v => v)})
    }catch(error){
      setEventError(eventState, error)
    }
  }

  // DELETE /events/:eventId EASY
  async function deleteEventQuery(id) {
    try {
      await request(`/events/${id}`, {method: "DELETE", credentials: "include"})
      setEventData(id, undefined)
    } catch (error) {
      setEventError(currentUserId, error)
    }
  }

  // DELETE /events/:eventId/invitee EASY

  // Need to figure out how to update the rest of the state

  // POST /events/:eventId/invitees MEDIUM User & Event must be updated
  // POST /events/:eventId/invitees/remove MEDIUM User & Event must be updated

  // POST /group EASY
  // GET /groups/:groupId EASY
  // PUT /groups/:groupId EASY
  // POST /groups/:groupId/users MEDIUM User & Group must be updated
  // DELETE /groups/:groupId/users/:userId MEDIUM User & Group must be updated
  // DELETE /groups/:groupId MEDIUM User & Group must be updated

  // GET /events/:eventId/exercises MEDIUM Exercises & Event must be updated
  // POST /events/:eventId/exercise MEDIUM Exercises & Event must be updated

  // GET /exercise/:exerciseId EASY
  // DELETE /exercise/:exerciseId MEDIUM Exercises & Event must be updated
  // POST /exercise/:exerciseId/response MEDIUM

  // PUT /responses/:responseId EASY
  // DELETE /responses/:responseId EASY

  return {
    // Getters
    getUserById,
    getEventById,
    getGroupById,
    getExerciseById,
    getExerciseResponseById,

    // Extra state
    user,
    isLoggedIn,
    event,

    // User Queries
    userQuery,
    currentUserQuery,
    createUserQuery,
    loginUserQuery,
    modifyUserQuery,
    deleteUserQuery,

    //Event Queries
    createEventQuery,
    eventFromIdQuery,
    currentUserEventQuery,
    modifyEventQuery,
    deleteEventQuery,

    //Event Exercises
    getEventExercisesQuery,
  }
}

const [GlobalProvider, useGlobalContext] = constate(useGlobal)

export {GlobalProvider, useGlobalContext}

// Public references to these three identifiers should look like this on the front end.
// This means user types groups in with #, usernames with @, and email normal.

// usernames: @username
// emails: email@email
// groups: #group

// These are the routes...

// POST /user
// {
//  email:"email@email.com"
//  password: "password"
//  passwordConfirmation: "password",
//  firstName: "John",
//  lastName: "Doe",
//  username: "username"
// }

// POST /user/login
// {
//  emailOrUsername: "username"
//  password: "password"
// }

// GET /users/:userId

// GET /users/me

// PUT /users/me/update
// {
//  lastName: "Last-name",
//  firstName: "First-name",
//  username: "username",
// }

// DELETE /users/me

// POST /event
// {
//  title: "Workout",
//  description: "This is a Workout Event",
//  type: "WORKOUT",
//  start: Date.now(),
//  finish: Date.now() + 30 * 60000
// }
//
// {
//  title: "Standard",
//  description: "This is a Standard Event",
//  type: "STANDARD",
//  start: Date.now(),
//  finish: Date.now() + 30 * 60000
// }

// GET /events

// PUT /events/:eventId
// {
//  title: "New tilte",
//  description: "New description",
//  start: Date.now(),
//  finish: Date.now() + 30 * 60000
// }

// DELETE /events/:eventId

// DELETE /events/:eventId/invitee

// POST /events/:eventId/invitees
// {
//  invitees: ["@username" , "email@email", "#group"]
// }

// POST /events/:eventId/invitees/remove
// {
//  userIds: [ 1 ],
//  groupIds: [ 2 ]
// }

// POST /group
// {
//  tag: "team"
// }

// GET /groups/:groupId

// PUT /groups/:groupId
// {
//  tag: "team"
// }

// POST /groups/:groupId/users
// {
//  userIds: [ 1 ]
// }

// DELETE /groups/:groupId/users/:userId

// DELETE /groups/:groupId

// GET /events/:eventId/exercises

// POST /events/:eventId/exercise
// {
//  type: "WEIGHTS",
//  name: "Bench",
//  reps: 8,
//  sets: 5,
// }

// GET /exercise/:exerciseId

// DELETE /exercise/:exerciseId

// POST /exercise/:exerciseId/response
// {
//   weights: [1, 2, 3, 4, 5]
// }

// PUT /responses/:responseId
// {
//  weights: [1, 2, 3, 4, 5]
// }

// DELETE /responses/:responseId
