import {useState, useCallback, useRef, useEffect} from "react"
import constate from "constate"
import {ApiError} from "../errors"
import {typographyVariant} from "@mui/system"
import {useNavigate} from "react-router"

async function request(input, init) {
  const request = new Request(input, init)
  return fetch(request).then(async res => {
    // res.ok === 200-299 HTTP Status Code
    console.log("INSIDE REQUEST")

    if (res.ok) {
      console.log("res.ok console log")

      if (request.method.toLowerCase() === "delete") {
        return
      }

      return res.json()
    } else {
      console.log("else console log")
      console.log(res.json)
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

  //   useEffect(() => {
  //     window.localStorage.setItem("userState", JSON.stringify(userState))
  //   }, [userState])
  //   useEffect(() => {
  //     window.localStorage.setItem("eventState", JSON.stringify(eventState))
  //   }, [eventState])
  //   useEffect(() => {
  //     window.localStorage.setItem("groupState", JSON.stringify(groupState))
  //   }, [groupState])
  //   useEffect(() => {
  //     window.localStorage.setItem("exerciseState", JSON.stringify(exerciseState))
  //   }, [exerciseState])
  //   useEffect(() => {
  //     window.localStorage.setItem(
  //       "exerciseResponseState",
  //       JSON.stringify(exerciseResponseState),
  //     )
  //   }, [exerciseResponseState])

  // Setters for Error and Data

  // These should be used to reflect the state changes inside the queries.
  // All states have the following 3 states loading, data, error

  // This happens on the first query
  // loading -> data
  // loading -> error

  // This happens when retry a failed query
  // error -> loading

  function createDataSetter(stateSetter) {
    return (id, value) => {
      stateSetter(prev => ({
        ...prev,
        [id]: typeof value === "function" ? value(prev[id] ?? {}) : value,
      }))
    }
  }

  const setUserData = createDataSetter(setUserState)
  const setEventData = createDataSetter(setEventState)
  const setGroupData = createDataSetter(setGroupState)
  const setExerciseData = createDataSetter(setExerciseState)
  const setExerciseResponseData = createDataSetter(setExerciseResponseState)

  const setCurrentUserId = id => {
    setUserData("currentUserId", id)
  }

  const setCurrentUserData = value => {
    setUserState(prev => {
      if (typeof value !== "function") {
        // console.log("Inside")
        // console.log({
        //   ...prev,
        //   currentUserId: value.id,
        //   [value.id]: value,
        // })

        return {
          ...prev,
          currentUserId: value.id,
          [value.id]: value,
        }
      }

      if (prev.currentUserId == null) {
        console.log("you probably messed up")
        return prev
      }

      return {
        ...prev,
        [prev.currentUserId]: value(prev[prev.currentUserId] ?? {}),
      }
    })
  }

  // Getters

  function createGetter(state) {
    return id => {
      return state[id]
    }
  }

  const getUserById = createGetter(userState)
  const getEventById = createGetter(eventState)
  const getGroupById = createGetter(groupState)
  const getExerciseById = createGetter(exerciseState)
  const getExerciseResponseById = createGetter(exerciseResponseState)

  const getCurrentUserId = () => {
    getUserById("currentUserId")
  }

  const getCurrentUser = () => getUserById(getCurrentUserId())
  const getIsLoggedIn = () => Boolean(getCurrentUser())

  // Queries available to the client

  //

  // GET /users/:userId
  // Tested
  async function userQuery(id) {
    const data = await request(`/users/${id}`, {credentials: "same-origin"})
    setUserData(id, data)
  }

  // GET /users/me
  // You need to be logged in in order to call this query, because you need to have current session
  // Tested
  async function currentUserQuery() {
    const data = await request("/users/me", {credentials: "same-origin"})
    setCurrentUserData(data)
  }

  function useIsLoggedIn() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
      currentUserQuery()
        .then(() => {
          setIsLoggedIn(true)
          setLoading(false)
        })
        .catch(() => {
          navigate("/login")
        })
    }, [])

    return [loading, isLoggedIn]
  }

  // POST /user
  // Tested
  async function createUserQuery(options) {
    const data = await request("/user", standardJsonInit("POST", options))
    setCurrentUserData(data)
  }

  // POST /user/login
  // Tested
  async function loginUserQuery(options) {
    const data = await request("/user/login", standardJsonInit("POST", options))
    setCurrentUserData(data)
  }

  // PUT /users/me
  // Tested
  async function modifyUserQuery(options) {
    const data = await request("/users/me", standardJsonInit("PUT", options))
    setCurrentUserData(data)
  }

  // DELETE /users/me
  // Note: Needs to be caught on the outside
  // Tested
  async function deleteUserQuery() {
    await request("/users/me", {method: "DELETE", credentials: "same-origin"})
    setUserData(getCurrentUserId(), undefined)
    setCurrentUserId(undefined)
  }

  // GET /events/:eventId/exercises
  // NOTE: Must be called after /events/:eventId
  // NOTE: Must be caught
  // X
  async function getEventExercisesQuery(id) {
    const data = await request(`/events/${id}/exercises`, {
      credentials: "same-origin",
    })

    for (const exercise of data) {
      setExerciseData(exercise.id, exercise)
    }

    setEventData(id, prev => ({
      ...prev,
      exercises: data.map(v => v.id),
    }))
  }

  // Queries TODO...

  // WIll have to reference schema to figure out relations

  // POST /event
  // Tested
  async function createEventQuery(options) {
    const data = await request("/event", standardJsonInit("POST", options))
    setEventData(data.id, data)
    setCurrentUserData(prev => ({
      ...prev,
      events: prev.events.concat(data.id),
    }))
  }

  // GET /events
  // Tested
  async function currentUserEventQuery() {
    const data = await request("/events", {credentials: "same-origin"})
    for (const event of data) {
      setEventData(event.id, event)
    }

    setCurrentUserData(prev => ({
      ...prev,
      events: data.map(v => v.id),
    }))
  }

  // GET /events/:eventId Specific User Event
  // Tested
  async function eventFromIdQuery(id) {
    const data = await request(`/events/${id}`, {credentials: "same-origin"})
    setEventData(data.id, data)
  }

  // PUT /events/:eventId EASY
  // Note: Must be caught
  // Tested
  async function modifyEventQuery(id, options) {
    const data = await request(
      `/events/${id}`,
      standardJsonInit("PUT", options),
    )
    setEventData(data.id, data)
  }

  // DELETE /events/:eventId EASY
  // Tested
  async function deleteEventQuery(id) {
    await request(`/events/${id}`, {
      method: "DELETE",
      credentials: "same-origin",
    })
    console.log("DELETED")
    setEventData(id, undefined)
  }

  // DELETE /events/:eventId/invitee EASY
  // Removes current user from event
  // Will test later when groups need to get involved
  async function deleteCurrentUserFromInviteeQuery(eventId) {
    await request(`/events/${eventId}/invitee`, {
      method: "DELETE",
      credentials: "same-origin",
    })

    const event = getEventById(eventId)
    setEventData(eventId, prev => ({
      ...prev,
      invitees: prev.invitees.filter(invitee => invitee !== getCurrentUserId()),
    }))
  }

  // Need to figure out how to update the rest of the state

  // POST /events/:eventId/invitees MEDIUM User & Event must be updated
  // Will test later when groups need to get involved
  async function createEventInviteeQuery(eventId, options) {
    const data = await request(
      `/events/${eventId}/invitees`,
      standardJsonInit("POST", options),
    )
    setEventData(data.id, data)
    for (const userId of data.invitees) {
      const user = getUserById(userId)
      if (!user) {
        continue
      }
      setUserData(userId, prev => ({
        ...prev,
        events: prev.events.concat(data.id),
      }))
    }
  }

  // POST /events/:eventId/invitees/remove MEDIUM User & Event must be updated
  // Will test later when groups need to get involved
  async function deleteEventInviteeQuery(eventId, options) {
    const data = await request(
      `/events/${eventId}/invitees/remove`,
      standardJsonInit("POST", options),
    )
    setEventData(data.id, data)
    for (const userId of options.userIds) {
      const user = getUserById(userId)
      if (!user) {
        continue
      }
      setUserData(userId, prev => ({
        ...prev,
        events: prev.events.filter(v => v !== data.id),
      }))
    }
  }
  //////////////////////////////////////////////////////////////////////////////
  // POST /group EASY
  // async function createGroupQuery(options) {
  //   const data = await request(`/group`, standardJsonInit("POST", options))
  //   for (const group of data) {
  //     setGroupData(group, group)
  //   }
  //   setUserData(currentUserIdMutationRef.current, {...user.data, groups: data.map(v => v)})
  // }

  // // GET /groups/:groupId EASY
  // async function getGroupIdQuery(id) {
  //   const data = await request(`/groups/${id}`, {credentials: "same-origin"})
  //   for (const group of data) {
  //     setGroupData(group, group)
  //   }
  //   setUserData(currentUserIdMutationRef.current, {...user.data, groups: data.map(v => v)})
  // }

  // // PUT /groups/:groupId EASY
  // async function modifyGroupQuery(id, options) {
  //   const data = await request(
  //     `/groups/${id}`,
  //     standardJsonInit("PUT", options),
  //   )
  //   setGroupData(group[id], data)
  //   setUserData(currentUserIdMutationRef.current, {...user.data, groups: data.map(v => v)})
  // }

  // POST /groups/:groupId/users MEDIUM User & Group must be updated
  // DELETE /groups/:groupId/users/:userId MEDIUM User & Group must be updated
  // DELETE /groups/:groupId MEDIUM User & Group must be updated
  /////////////////////////////////////////////////////////////////////////////////////////

  // GET /events/:eventId/exercises MEDIUM Exercises & Event must be updated
  async function getExercisesFromEventIdQuery(id) {
    const data = await request(`/events/${id}/exercises`, {
      credentials: "same-origin",
    })
    // console.log(data)
    for (const exercise of data) {
      setExerciseData(exercise.id, exercise)
    }

    setEventData(id, prev => ({
      ...prev,
      exercises: data.map(v => v.id),
    }))
  }

  // POST /events/:eventId/exercise MEDIUM Exercises & Event must be updated
  async function createExerciseWithEventIdQuery(id, options) {
    const data = await request(
      `/events/${id}/exercise`,
      standardJsonInit("POST", options),
    )
    setExerciseData(data.id, data)
    setEventData(id, prev => ({
      ...prev,
      exercises: prev.exercises.concat(data.id),
    }))
  }

  // GET /exercise/:exerciseId EASY
  async function getExerciseByIdQuery(id) {
    const data = await request(`/exercise/${id}`, {
      credentials: "same-origin",
    })
    setExerciseData(data.id, data)
  }

  // DELETE /exercise/:exerciseId MEDIUM Exercises & Event must be updated
  async function deleteExerciseQuery(id) {
    await request(`/exercise/${id}`, {
      method: "DELETE",
      credentials: "same-origin",
    })
    setExerciseData(id, undefined)
  }

  // POST /exercise/:exerciseId/response MEDIUM
  async function createExerciseResponseQuery(exerciseId, options) {
    const data = await request(
      `/exercise/${exerciseId}/response`,
      standardJsonInit("POST", options),
    )
    setExerciseResponseData(data.id, data)

    setExerciseData(exerciseId, prev => ({
      ...prev,
      exerciseResponses: prev.exerciseResponses.concat(data.id),
    }))
  }

  // PUT /responses/:responseId EASY
  async function modifyExerciseResponseQuery(id, options) {
    const data = await request(
      `/responses/${id}`,
      standardJsonInit("PUT", options),
    )
    setExerciseResponseData(data.id, data)
  }

  // DELETE /responses/:responseId EASY
  async function deleteExerciseResponseQuery(id) {
    await request(`/responses/${id}`, {
      method: "DELETE",
      credentials: "include",
    })
    setExerciseResponseData(id, undefined)
  }

  const currentUser = userState.currentUserId
    ? getUserById(userState.currentUserId)
    : undefined

  return {
    userState,
    eventState,
    groupState,
    exerciseState,
    exerciseResponseState,

    // Getters
    getUserById,
    getEventById,
    getGroupById,
    getExerciseById,
    getExerciseResponseById,

    // Extra state
    user: currentUser,
    isLoggedIn: Boolean(currentUser),
    useIsLoggedIn,

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
    deleteCurrentUserFromInviteeQuery,
    createEventInviteeQuery,
    deleteEventInviteeQuery,

    //Event Exercises Queries
    getEventExercisesQuery,
    getExercisesFromEventIdQuery,
    createExerciseWithEventIdQuery,
    getExerciseByIdQuery,
    deleteExerciseQuery,
    createExerciseResponseQuery,
    modifyExerciseResponseQuery,
    deleteExerciseResponseQuery,
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
