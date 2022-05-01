import {React, useState, useEffect} from "react"
import "./GroupPage.scss"
import BottomBar from "../PageOverlay/BottomBar.js"
import TopButtons from "../PageOverlay/TopButtons.js"
import {useGlobalContext} from "../../store"
import {useNavigate} from "react-router-dom"
import EventContainer from "../EventContainer/EventContainer.js"
import DownloadIcon from "@mui/icons-material/Download"
import SettingsPage from "../SettingsPage"
import ReactExport from "react-export-excel"

const GroupPage = ({setId, id, darkmode, setS}) => {
    const {
        user,
        userState,
        exerciseResponseState,
        exerciseState,
        isLoggedIn,
        userQuery,
        eventFromIdQuery,
        eventState,
        groupState,
        userByUsernameQuery,
        currentUserQuery,
        addMemberToGroupQuery,
        deleteMemberFromGroupQuery,
        getUserById,
        getGroupById,
        getExerciseById,
        getExerciseByIdQuery,
        getExercisesFromEventIdQuery,
        getExerciseResponseById,
        getExerciseResponseFromExerciseIdQuery,
        getGroupIdQuery,
        getEventExercisesQuery,
        getEventById,
        createEventInviteeQuery,
        deleteGroupQuery,
    } = useGlobalContext()
    const [settingsOpen, setSettingsOpen] = useState()

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()
    const [display, setDisplay] = useState([])
    const [userToDelete, setUserToDelete] = useState("")
    const [userIdToDelete, setUserIdToDelete] = useState()
    const [deleteUser, setDeleteUser] = useState(false)
    const [usersToAdd, setUsersToAdd] = useState("")
    const [exercisesToAdd, setExercisesToAdd] = useState("")
    const [addExercises, setAddExercises] = useState(false)
    const [exerciseIdsToAdd, setExerciseIdsToAdd] = useState([])
    const [addUsers, setAddUsers] = useState(false)
    const [addUsernames, setAddUsernames] = useState(false)
    const [idsToAdd, setIdsToAdd] = useState([])
    const [namesData, setNamesData] = useState([])
    const ExcelFile = ReactExport.ExcelFile
    const ExcelSheet = ReactExport.ExcelFile.ExcelSheet
    const ExcelColumn = ReactExport.ExcelFile.ExcelColumn
    const usernameData = []

    const names = {
        data: [],
    }

    const group = getGroupById(id)

    const groupUsernames = loading
        ? []
        : group.users.map(userId => getUserById(userId).username)

    const groupMembers = loading
        ? []
        : group.users.map(userId => getUserById(userId))

    const userIsOwner = loading ? false : group.owners.includes(user.id)

    const groupOwnerUsername = loading
        ? undefined
        : getUserById(group.owners[0]).username

    const groupEventTitles = loading
        ? []
        : group.events.map(eventId => getEventById(eventId).title)

    const groupEvents = loading
        ? []
        : group.events.map(eventId => getEventById(eventId))
    let exerciseResponses = []
    let exercises = []
    let colHeaders = ["Username", "Squat", "Squat Jumps", "Lunges"]

    let navigate = useNavigate()

    const routeBackToGroups = () => {
        let path = `group`
        navigate(path)
    }

    const refreshPage = () => {
        window.location.reload(false)
    }

    const handleDeleteEvent = () => {
        deleteGroupQuery(id)
        routeBackToGroups()
    }

    const handleChangeDeleteUser = e => {
        setUserToDelete(e.target.value)
    }

    const handleDeleteUser = () => {
        setDeleteUser(true)
    }

    const handleChangeAddUsers = e => {
        setUsersToAdd(e.target.value)
    }

    const handleAddUsers = () => {
        setAddUsers(true)
    }

    useEffect(() => {
        if (deleteUser) {
            ;(async () => {
                for (const userId of getGroupById(id).users) {
                    if (userToDelete === getUserById(userId).username)
                        await deleteMemberFromGroupQuery(id, Number(userId))
                }
            })()
                .catch(setError)
                .finally(() => {
                    setDeleteUser(false)
                    refreshPage()
                })
        }
    }, [deleteUser])

    useEffect(() => {
        if (addUsers) {
            ;(async () => {
                const inviteeUsernames = usersToAdd.split(",").map(String)
                for (const key of inviteeUsernames) {
                    const id = await userByUsernameQuery(key)
                    setIdsToAdd(oldArray => [...oldArray, id])
                }
            })()
                .catch(setError)
                .finally(() => {
                    setAddUsers(false)
                    setAddUsernames(true)
                })
        }
    }, [addUsers])

    useEffect(() => {
        if (addUsernames) {
            ;(async () => {
                console.log(idsToAdd)
                await addMemberToGroupQuery(id, {
                    userIds: idsToAdd,
                })
            })()
                .catch(setError)
                .finally(() => {
                    setAddUsernames(false)
                    refreshPage()
                })
        }
    }, [addUsernames])

    useEffect(() => {
        if (addExercises) {
            ;(async () => {
                const exerciseNames = exercisesToAdd.split(",").map(String)
                for (const key of exerciseNames) {
                    const id = await getExerciseByIdQuery(key)
                    setExerciseIdsToAdd(tmpArray => [...tmpArray, id])
                    console.log(setExerciseIdsToAdd)
                }
            })()
                .catch(setError)
                .finally(() => {
                    setAddExercises(false)
                    setAddExercises(true)
                })
        }
    }, [addUsers])

    useEffect(() => {
        ;(async () => {
            await getGroupIdQuery(id)

            for (const userId of getGroupById(id).users) {
                await userQuery(userId)
            }

            for (const userId of getGroupById(id).owners) {
                await userQuery(userId)
            }

            for (const eventId of getGroupById(id).events) {
                console.log("eventId", eventId)
                await eventFromIdQuery(eventId)
                await getExercisesFromEventIdQuery(eventId)
                for (const exerciseId of getEventById(eventId).exercises) {
                    await getExerciseResponseFromExerciseIdQuery(exerciseId)
                }
            }

            /*await eventFromIdQuery(getEventById(id).type)
            if(getEventById(id).type === "WORKOUT") {
                setEventIsWorkout(true)
            }*/

            // Section
            // setOwner(getUserById(getGroupById(id).owners[0]).username)
            // while (groupUsernames.length) {
            //     usernameData.push(groupUsernames.splice(0, 1))
            // }
            // setDisplay([...groupUsernames])
            // setNamesData([usernameData])
            // setLoading(false)

            // //

            // setExerciseQueried(true)
            // setColumnHeaders([...colHeaders])
            // setLoading(false)

            // //

            // for (const eventId in getGroupById(id).events) {
            //     for (const exerciseId in getEventById(eventId).exercises) {
            //         await getExerciseResponseFromExerciseIdQuery(exerciseId)
            //     }
            // }

            // //

            // const users = getGroupById(id).users
            // const events = getGroupById(id).events
            // console.log(namesData)
            // console.log(users.length)
            // for (const eventId of ) {

            //     groupEvents.push()
            // }
            // for (let i = 0; i < users.length; i++) {
            //     namesData[0][i].push(getExerciseById(1).name)
            //     console.log(namesData)
            // }
            // setDisplayEvents([...groupEvents])
        })()
            .catch(setError)
            .finally(() => {
                setLoading(false)
            })
    }, [])

    useEffect(() => {
        if (error) {
            alert("Error: " + String(error))
        }
    }, [error])

    //////////////////////////////////////////

    // useEffect(() => {
    //     console.log("userState:", userState)
    // }, [userState])

    // useEffect(() => {
    //     console.log("eventState:", eventState)
    // }, [eventState])

    // useEffect(() => {
    //     console.log("groupState:", groupState)
    // }, [groupState])

    // useEffect(() => {
    //     console.log("exerciseState:", exerciseState)
    // }, [exerciseState])

    // useEffect(() => {
    //     console.log("exerciseResponseState:", exerciseResponseState)
    // }, [exerciseResponseState])

    ///////////////////////////////////////
    //Makes array
    function createData(eventId) {
        const event = getEventById(eventId)

        const data = []

        const userIds = [
            ...new Set(
                []
                    .concat(event.users)
                    .concat(event.owners)
                    .concat(
                        ...event.groups.map(groupId => {
                            const group = getGroupById(groupId)
                            return group.users.concat(group.owners)
                        }),
                    ),
            ).values(),
        ]

        for (const exerciseId of event.exercises) {
            const exercise = getExerciseById(exerciseId)
            for (const userId of userIds) {
                const user = getUserById(userId)
                for (const responseId of exercise.responses) {
                    const response = getExerciseResponseById(responseId)
                    if (response.user === userId) {
                        data.push([
                            user.username,
                            exercise.name,
                            String(response.weights),
                        ])
                    } else {
                        data.push([user.username, exercise.name, "N/A"])
                        // Have not submitted
                    }
                }
            }
        }

        return [{columns: ["Username", "Exercise", "Response"], data}]

        // for (const el of groupMembers) {
        //     const member = getUserById(el.id)
        //     arr.push(member.username)
        //     for (const el2 of event.exercises) {
        //         const exercise = getExerciseById(el2)
        //         arr.push(exercise.name)
        //         // arr2.push(" ")
        //         for (const el3 of exercise.responses) {
        //             const response = getExerciseResponseById(el3)
        //             // console.log("RESPONSE: ", response)
        //             if (response.user === member.id) {
        //                 console.log("MATCHING ID's TO RESPONSE")
        //                 if (response.weights === undefined) {
        //                     arr2.push("0")
        //                 } else {
        //                     arr2.push(response.weights)
        //                 }
        //                 continue
        //             }
        //             arr2.push("0")
        //         }
        //     }
        //     // console.log("arr: ", arr)
        //     // console.log("arr: ", arr2)
        //     arr2.unshift(" ")
        //     dataToExport.push(arr)
        //     dataToExport.push(arr2)
        //     arr = []
        //     arr2 = []
        // }
    }

    // const test = createData(4)

    // console.log("dataToExport: ", dataToExport)
    //Testing
    //const usernameData = ["test1", "test2", "test3"];

    // Change to made array
    const dataToExport = [
        {
            columns: ["Username", "Exercise", "Response"],
            data: [
                ["Charles", "Exercise 1", "1,2,3"],
                ["Charles", "Exercise 2", "1,2,3"],
                [" ", "135,145,155", "125,35,20"],
                ["Alex", "Exercise", 135],
            ],
        },
    ]

    return (
        <div class={"theme " + (darkmode ? "light" : "dark")}>
            <pre>
                {JSON.stringify(
                    {
                        // test,
                    },
                    null,
                    2,
                )}
            </pre>
            <div className="group">
                <TopButtons
                    className="tb"
                    showButtonNotification={false}
                    showButtonAdd={false}
                    settingsOpen={settingsOpen}
                    setSettingsOpen={setSettingsOpen}
                />
                <SettingsPage
                    darkmode={darkmode}
                    setS={setS}
                    settingsOpen={settingsOpen}
                />
                {loading ? (
                    <div className="loading">
                        <span>LOADING</span>
                    </div>
                ) : (
                    <div className="middle">
                        <div className="middleHeader">
                            <h1>{getGroupById(id).tag}</h1>
                            {userIsOwner ? (
                                <button onClick={handleDeleteEvent}>
                                    DELETE GROUP
                                </button>
                            ) : (
                                <></>
                            )}
                        </div>

                        <div className="middleWrapper">
                            <div className="groupName">
                                <h2>Owner:</h2>
                                <span>{groupOwnerUsername}</span>
                                <h2>Users:</h2>
                                <ul>
                                    {groupUsernames.map(el => (
                                        <li>{el}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="groupEvents">
                                <h1>Group Events: </h1>
                                <ul>
                                    {groupEvents.map(event => {
                                        const data = createData(event.id)
                                        return (
                                            <li>
                                                {event.title}
                                                {userIsOwner ? (
                                                    <ExcelFile
                                                        element={
                                                            <button>
                                                                <DownloadIcon></DownloadIcon>
                                                            </button>
                                                        }
                                                    >
                                                        <ExcelSheet
                                                            dataSet={data}
                                                            name="Event Details"
                                                        />
                                                    </ExcelFile>
                                                ) : (
                                                    <></>
                                                )}
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                            {userIsOwner ? (
                                <div className="groupDetails">
                                    <div className="form">
                                        <div className="list">
                                            <div>
                                                <label>Remove User</label>
                                                <input
                                                    type="text"
                                                    value={userToDelete}
                                                    onChange={
                                                        handleChangeDeleteUser
                                                    }
                                                    placeholder="Enter single username"
                                                />
                                                <button
                                                    type="submit"
                                                    value="Remove user"
                                                    onClick={handleDeleteUser}
                                                >
                                                    REMOVE
                                                </button>
                                            </div>
                                            <div className="addContainer">
                                                <label>Add Users</label>
                                                <input
                                                    type="text"
                                                    value={usersToAdd}
                                                    onChange={
                                                        handleChangeAddUsers
                                                    }
                                                    placeholder="Enter username separated by commas with no space"
                                                />
                                                <button
                                                    type="submit"
                                                    value="Add users"
                                                    onClick={handleAddUsers}
                                                >
                                                    ADD
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div> //middle
                )}

                <div className="bottomBar">
                    <BottomBar />
                </div>
            </div>
        </div>
    )
}

export default GroupPage
