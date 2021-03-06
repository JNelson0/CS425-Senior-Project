import {useState, useEffect, useRef} from "react"
import constate from "constate"
import {ApiError} from "../errors"
import {useNavigate} from "react-router"

async function request(input, init) {
    const request = new Request(input, init)
    return fetch(request).then(async res => {
        // res.ok === 200-299 HTTP Status Code
        if (res.ok) {
            if (request.method.toLowerCase() === "delete") {
                return
            }
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
    const [userState, _setUserState] = useState({})
    const [eventState, _setEventState] = useState({})
    const [groupState, _setGroupState] = useState({})
    const [exerciseState, _setExerciseState] = useState({})
    const [exerciseResponseState, _setExerciseResponseState] = useState({})

    const userStateRef = useRef({})
    useEffect(() => {
        userStateRef.current = userState
    }, [userState])
    const eventStateRef = useRef({})
    useEffect(() => {
        eventStateRef.current = eventState
    }, [eventState])
    const groupStateRef = useRef({})
    useEffect(() => {
        groupStateRef.current = groupState
    }, [groupState])
    const exerciseStateRef = useRef({})
    useEffect(() => {
        exerciseStateRef.current = exerciseState
    }, [exerciseState])
    const exerciseResponseStateRef = useRef({})
    useEffect(() => {
        exerciseResponseStateRef.current = exerciseResponseState
    }, [exerciseResponseState])

    const createSetRefState = (ref, setter) => setStateAction => {
        setter(setStateAction)

        ref.current =
            typeof setStateAction === "function"
                ? setStateAction(ref.current)
                : setStateAction
    }

    const setUserState = createSetRefState(userStateRef, _setUserState)
    const setEventState = createSetRefState(eventStateRef, _setEventState)
    const setGroupState = createSetRefState(groupStateRef, _setGroupState)
    const setExerciseState = createSetRefState(
        exerciseStateRef,
        _setExerciseState,
    )
    const setExerciseResponseState = createSetRefState(
        exerciseResponseStateRef,
        _setExerciseResponseState,
    )

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

    // Setters for Data
    function createDataSetter(stateSetter) {
        return (id, value) => {
            stateSetter(prev => ({
                ...prev,
                [id]:
                    typeof value === "function" ? value(prev[id] ?? {}) : value,
            }))
        }
    }

    const createRefDataSetter = (ref, setter) => (id, value) => {
        if (typeof value === "function") {
        } else {
        }

        // ref.current =
        //     typeof setStateAction === "function"
        //         ? setStateAction(ref.current)
        //         : setStateAction
        // setter(ref.current)
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
    function createGetter(stateRef) {
        return id => {
            return stateRef.current[id]
        }
    }

    const getUserById = createGetter(userStateRef)
    const getEventById = createGetter(eventStateRef)
    const getGroupById = createGetter(groupStateRef)
    const getExerciseById = createGetter(exerciseStateRef)
    const getExerciseResponseById = createGetter(exerciseResponseStateRef)

    const getCurrentUserId = () => {
        getUserById("currentUserId")
    }

    const getCurrentUser = () => getUserById(getCurrentUserId())
    const getIsLoggedIn = () => Boolean(getCurrentUser())

    // Queries available to the client

    // GET /users/:userId
    async function userQuery(id) {
        const data = await request(`/users/${id}`, {credentials: "same-origin"})
        setUserData(id, data)
    }

    // GET /users/me
    // You need to be logged in in order to call this query, because you need to have current session
    async function currentUserQuery() {
        const data = await request("/users/me", {credentials: "same-origin"})
        setCurrentUserData(data)
    }

    // GET /users/:username
    async function userByUsernameQuery(username) {
        const data = await request(`/users/user/${username}`, {
            credentials: "same-origin",
        })
        setUserData(data.id, data)
        return data.id
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

    async function logoutUser() {
        setUserData(userState.currentUserId, undefined)
        currentUser = undefined
    }

    // POST /user
    async function createUserQuery(options) {
        const data = await request("/user", standardJsonInit("POST", options))
        setCurrentUserData(data)
    }

    // POST /user/login
    async function loginUserQuery(options) {
        const data = await request(
            "/user/login",
            standardJsonInit("POST", options),
        )
        setCurrentUserData(data)
    }

    // PUT /users/me
    async function modifyUserQuery(options) {
        const data = await request(
            "/users/me",
            standardJsonInit("PUT", options),
        )
        setCurrentUserData(data)
    }

    // DELETE /users/me
    // Note: Needs to be caught on the outside
    async function deleteUserQuery() {
        await request("/users/me", {
            method: "DELETE",
            credentials: "same-origin",
        })
        setUserData(getCurrentUserId(), undefined)
        setCurrentUserId(undefined)
    }

    // GET /events/:eventId/exercises
    // NOTE: Must be called after /events/:eventId
    // NOTE: Must be caught
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

    // POST /event
    async function createEventQuery(options) {
        const data = await request("/event", standardJsonInit("POST", options))
        setEventData(data.id, data)
        setCurrentUserData(prev => ({
            ...prev,
            events: prev.events.concat(data.id),
        }))
        return data.id
    }

    // GET /events
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

    // GET /events/:eventId
    async function eventFromIdQuery(id) {
        const data = await request(`/events/${id}`, {
            credentials: "same-origin",
        })
        setEventData(data.id, data)
    }

    // PUT /events/:eventId EASY
    // Note: Must be caught
    async function modifyEventQuery(id, options) {
        const data = await request(
            `/events/${id}`,
            standardJsonInit("PUT", options),
        )
        setEventData(data.id, data)
    }

    // DELETE /events/:eventId EASY
    async function deleteEventQuery(id) {
        await request(`/events/${id}`, {
            method: "DELETE",
            credentials: "same-origin",
        })
        setEventData(id, undefined)
    }

    // DELETE /events/:eventId/invitee EASY
    // Removes current user from event
    async function deleteCurrentUserFromInviteeQuery(eventId) {
        await request(`/events/${eventId}/invitee`, {
            method: "DELETE",
            credentials: "same-origin",
        })

        setEventData(eventId, prev => ({
            ...prev,
            invitees: prev.invitees.filter(
                invitee => invitee !== getCurrentUserId(),
            ),
        }))
    }

    // POST /events/:eventId/invitees MEDIUM User & Event must be updated
    async function createEventInviteeQuery(eventId, options) {
        const data = await request(
            `/events/${eventId}/invitees`,
            standardJsonInit("POST", options),
        )
        setEventData(data.id, data)
        for (const userId of data.users) {
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

    // POST /group
    async function createGroupQuery(options) {
        const data = await request(`/group`, standardJsonInit("POST", options))

        setGroupData(data.id, data)
        setUserData(prev => ({
            ...prev,
            group: prev.group.concat(data.id),
        }))
        return data.id
    }

    // GET /groups
    async function currentUserGroupQuery() {
        const data = await request("/groups", {credentials: "same-origin"})

        for (const group of data) {
            setGroupData(group.id, group)
        }

        setCurrentUserData(prev => ({
            ...prev,
            groups: data.map(v => v.id),
        }))
    }

    // // GET /groups/:groupId
    async function getGroupIdQuery(id) {
        const data = await request(`/groups/${id}`, {
            credentials: "same-origin",
        })
        setGroupData(data.id, data)
    }

    // // PUT /groups/:groupId
    async function modifyGroupQuery(id, options) {
        const data = await request(
            `/groups/${id}`,
            standardJsonInit("PUT", options),
        )
        setGroupData(data.id, data)
    }

    // POST /groups/:groupId/users
    async function addMemberToGroupQuery(groupId, options) {
        const data = await request(
            `/groups/${groupId}/users`,
            standardJsonInit("POST", options),
        )
        setGroupData(data.id, data)
        for (const userId of data.users) {
            const user = getUserById(userId)
            if (!user) {
                continue
            }
            setUserData(userId, prev => ({
                ...prev,
                groups: prev.groups.concat(data.id),
            }))
        }
    }

    // DELETE /groups/:groupId/users/:userId
    async function deleteMemberFromGroupQuery(groupId, userId) {
        await request(`/groups/${groupId}/users/${userId}`, {
            method: "DELETE",
            credentials: "same-origin",
        })

        const group = getGroupById(groupId)
        setGroupData(groupId, prev => ({
            ...prev,
            users: prev.users.filter(v => v !== group.id),
        }))

        const user = getUserById(userId)
        if (!user) {
            return
        }
        setUserData(userId, prev => ({
            ...prev,
            group: prev.group.filter(v => v !== userId),
        }))
    }

    // DELETE /groups/:groupId MEDIUM User & Group must be updated
    async function deleteGroupQuery(id) {
        await request(`/groups/${id}`, {
            method: "DELETE",
            credentials: "same-origin",
        })
        setGroupData(id, undefined)
    }

    // GET /events/:eventId/exercises
    async function getExercisesFromEventIdQuery(id) {
        const data = await request(`/events/${id}/exercises`, {
            credentials: "same-origin",
        })
        console.log("getExercisesFromEventIdQuery:", data)
        for (const exercise of data) {
            setExerciseData(exercise.id, exercise)
        }

        setEventData(id, prev => ({
            ...prev,
            exercises: data.map(v => v.id),
        }))
    }

    // POST /events/:eventId/exercise
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

    // GET /exercise/:exerciseId
    async function getExerciseByIdQuery(id) {
        const data = await request(`/exercise/${id}`, {
            credentials: "same-origin",
        })
        setExerciseData(data.id, data)
    }

    // DELETE /exercise/:exerciseId
    async function deleteExerciseQuery(id) {
        await request(`/exercise/${id}`, {
            method: "DELETE",
            credentials: "same-origin",
        })
        setExerciseData(id, undefined)
    }

    // POST /exercise/:exerciseId/response
    async function createExerciseResponseQuery(exerciseId, options) {
        const data = await request(
            `/exercise/${exerciseId}/response`,
            standardJsonInit("POST", options),
        )
        // console.log(data.id)
        setExerciseResponseData(data.id, data)

        setExerciseData(exerciseId, prev => ({
            ...prev,
            responses: prev.responses.concat(data.id),
        }))
    }

    // GET /exercise/:exerciseId/responses
    async function getExerciseResponseFromExerciseIdQuery(exerciseId) {
        const data = await request(`/exercise/${exerciseId}/responses`, {
            credentials: "same-origin",
        })

        console.log("data:", exerciseId, data)

        for (const exerciseResponse of data) {
            setExerciseResponseData(exerciseResponse.id, exerciseResponse)
        }

        setExerciseData(exerciseId, prev => {
            console.log("PREV", exerciseId, prev)

            return {
                ...prev,
                responses: data.map(v => v.id),
            }
        })
    }

    // PUT /responses/:responseId
    async function modifyExerciseResponseQuery(id, options) {
        const data = await request(
            `/responses/${id}`,
            standardJsonInit("PUT", options),
        )
        setExerciseResponseData(data.id, data)
    }

    // DELETE /responses/:responseId
    async function deleteExerciseResponseQuery(id) {
        await request(`/responses/${id}`, {
            method: "DELETE",
            credentials: "include",
        })
        setExerciseResponseData(id, undefined)
    }

    // POST /googleapi/create-event
    async function createGoogleEventQuery(options) {
        await request(
            `/googleapi/create-event`,
            standardJsonInit("POST", options),
        )
    }

    // POST /googleapi/generate-auth-token
    async function generateGoogleTokensQuery(options) {
        await request(
            `/googleapi/generate-auth-token`,
            standardJsonInit("POST", options),
        )
    }

    // Check for google auth token
    async function checkUserGoogleTokenQuery() {
        const tokenExists = await request(`/googleapi/check-usertokens`, {
            credentials: "same-origin",
        })
        return tokenExists
    }
    const currentUser = userState.currentUserId
        ? getUserById(userState.currentUserId)
        : undefined
    return {
        userState: userStateRef.current,
        eventState: eventStateRef.current,
        groupState: groupStateRef.current,
        exerciseState: exerciseStateRef.current,
        exerciseResponseState: exerciseResponseStateRef.current,

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
        logoutUser,

        // User Queries
        userQuery,
        userByUsernameQuery,
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
        getExerciseResponseFromExerciseIdQuery,

        //Group Queries
        createGroupQuery,
        getGroupIdQuery,
        currentUserGroupQuery,
        modifyGroupQuery,
        addMemberToGroupQuery,
        deleteMemberFromGroupQuery,
        deleteGroupQuery,

        //Google Queries
        createGoogleEventQuery,
        generateGoogleTokensQuery,
        checkUserGoogleTokenQuery,
    }
}
const [GlobalProvider, useGlobalContext] = constate(useGlobal)

export {GlobalProvider, useGlobalContext}

// // Public references to these three identifiers should look like this on the front end.
// // This means user types groups in with #, usernames with @, and email normal.

// // usernames: @username
// // emails: email@email
// // groups: #group

// // These are the routes...

// // POST /user
// // {
// //  email:"email@email.com"
// //  password: "password"
// //  passwordConfirmation: "password",
// //  firstName: "John",
// //  lastName: "Doe",
// //  username: "username"
// // }

// // POST /user/login
// // {
// //  emailOrUsername: "username"
// //  password: "password"
// // }

// // GET /users/:userId

// // GET /users/me

// // PUT /users/me/update
// // {
// //  lastName: "Last-name",
// //  firstName: "First-name",
// //  username: "username",
// // }

// // DELETE /users/me

// // POST /event
// // {
// //  title: "Workout",
// //  description: "This is a Workout Event",
// //  type: "WORKOUT",
// //  start: Date.now(),
// //  finish: Date.now() + 30 * 60000
// // }
// //
// // {
// //  title: "Standard",
// //  description: "This is a Standard Event",
// //  type: "STANDARD",
// //  start: Date.now(),
// //  finish: Date.now() + 30 * 60000
// // }

// // GET /events

// // PUT /events/:eventId
// // {
// //  title: "New tilte",
// //  description: "New description",
// //  start: Date.now(),
// //  finish: Date.now() + 30 * 60000
// // }

// // DELETE /events/:eventId

// // DELETE /events/:eventId/invitee

// // POST /events/:eventId/invitees
// // {
// //  invitees: ["@username" , "email@email", "#group"]
// // }

// // POST /events/:eventId/invitees/remove
// // {
// //  userIds: [ 1 ],
// //  groupIds: [ 2 ]
// // }

// // POST /group
// // {
// //  tag: "team"
// // }

// // GET /groups/:groupId

// // PUT /groups/:groupId
// // {
// //  tag: "team"
// // }

// // POST /groups/:groupId/users
// // {
// //  userIds: [ 1 ]
// // }

// // DELETE /groups/:groupId/users/:userId

// // DELETE /groups/:groupId

// // GET /events/:eventId/exercises

// // POST /events/:eventId/exercise
// // {
// //  type: "WEIGHTS",
// //  name: "Bench",
// //  reps: 8,
// //  sets: 5,
// // }

// // GET /exercise/:exerciseId

// // DELETE /exercise/:exerciseId

// // POST /exercise/:exerciseId/response
// // {
// //   weights: [1, 2, 3, 4, 5]
// // }

// // PUT /responses/:responseId
// // {
// //  weights: [1, 2, 3, 4, 5]
// // }

// // DELETE /responses/:responseId
