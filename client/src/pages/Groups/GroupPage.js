import {React, useState, useEffect} from "react"
import "./GroupPage.scss"
import BottomBar from "../PageOverlay/BottomBar.js"
import TopButtons from "../PageOverlay/TopButtons.js"
import {useGlobalContext} from "../../store"
import {useNavigate} from "react-router-dom"
import EventContainer from "../EventContainer/EventContainer.js"
import DownloadIcon from "@mui/icons-material/Download"
import SettingsPage from "../SettingsPage"
const GroupPage = ({setId, id, darkmode, setS}) => {
    const {
        user,
        userState,
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
        getGroupIdQuery,
        getEventById,
        createEventInviteeQuery,
        deleteGroupQuery,
    } = useGlobalContext()
    const [settingsOpen, setSettingsOpen] = useState()

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()
    const [display, setDisplay] = useState([])
    const [displayEvents, setDisplayEvents] = useState([])
    const [queried, setQueried] = useState(false)
    const [userQueried, setUserQueried] = useState(false)
    const [eventQueried, setEventQueried] = useState(false)
    const [owner, setOwner] = useState()
    const [userIsOwner, setUserIsOwner] = useState(false)
    const [eventIsWorkout, setEventIsWorkout] = useState(false)
    const [userToDelete, setUserToDelete] = useState("")
    const [userIdToDelete, setUserIdToDelete] = useState()
    const [deleteUser, setDeleteUser] = useState(false)
    const [usersToAdd, setUsersToAdd] = useState("")
    const [addUsers, setAddUsers] = useState(false)
    const [addUsernames, setAddUsernames] = useState(false)
    const [idsToAdd, setIdsToAdd] = useState([])
    let groupUsers = []
    let groupEvents = []

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
        ;(async () => {
            let id = await getGroupIdQuery(id)
        })()
            .catch(setError)
            .finally(() => {
                setQueried(true)
            })
    }, [])

    useEffect(() => {
        if (queried) {
            ;(async () => {
                for (const userId of getGroupById(id).users) {
                    await userQuery(userId)
                }
                await userQuery(getGroupById(id).owners[0])
                if (getGroupById(id).owners[0] === user.id) {
                    setUserIsOwner(true)
                }
            })()
                .catch(setError)
                .finally(() => {
                    setUserQueried(true)
                })
        }
    }, [queried])

    useEffect(() => {
        if (queried) {
            ;(async () => {
                for (const eventId of getGroupById(id).events) {
                    await eventFromIdQuery(eventId)
                    //if(getEventById(eventId).type === "WORKOUT") {
                    //setEventIsWorkout(true)
                }
                //}
                /*await eventFromIdQuery(getEventById(id).type)
                if(getEventById(id).owners[0] === "WORKOUT") {
                    setEventIsWorkout(true)
                }*/
            })()
                .catch(setError)
                .finally(() => {
                    setEventQueried(true)
                })
        }
    }, [queried])

    useEffect(() => {
        if (userQueried) {
            ;(async () => {
                for (const userId of getGroupById(id).users) {
                    groupUsers.push(getUserById(userId).username)
                }
                setOwner(getUserById(getGroupById(id).owners[0]).username)
            })()
                .catch(setError)
                .finally(() => {
                    setDisplay([...groupUsers])
                    setLoading(false)
                })
        }
    }, [userQueried])

    useEffect(() => {
        if (eventQueried) {
            ;(async () => {
                for (const eventId of getGroupById(id).events) {
                    console.log(groupEvents)
                    groupEvents.push(getEventById(eventId).title)
                    console.log(groupEvents)
                }
            })()
                .catch(setError)
                .finally(() => {
                    setDisplayEvents([...groupEvents])
                    setLoading(false)
                })
        }
    }, [eventQueried])

    return (
        <div class={"theme " + (darkmode ? "light" : "dark")}>
            <div className="group">
                <TopButtons
                    className="tb"
                    showButtonNotification={false}
                    showButtonAdd={false}
                    settingsOpen={settingsOpen}
                    setSettingsOpen={setSettingsOpen}
                />
                {settingsOpen ? (
                    <SettingsPage darkmode={darkmode} setS={setS} />
                ) : (
                    <></>
                )}
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
                ) :<></>}
                    </div>
                    <div className="middleWrapper">
                        <div className="groupName">
                            <h2>Owner:</h2>
                            <span>{owner}</span>               
                            <h2>Users:</h2>
                            <ul>
                                {display.map(el => (
                                    <li>{el}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="groupEvents">
                            <h1>Group Events: </h1>
                            <ul>
                            {displayEvents.map(el => (
                                    <li>{el}{userIsOwner ? (<button>
                                        <DownloadIcon>
                                            
                                        </DownloadIcon>
                                    </button>
                                    ):(<></>)}</li>
                                ))}                         
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
                                            onChange={handleChangeDeleteUser}
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
                                            onChange={handleChangeAddUsers}
                                            placeholder="Enter userIds separated by commas with no space"
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
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                )}
                <div className="bottomBar">
                    <BottomBar />
                </div>
            </div>
        </div>
    )
}

export default GroupPage
