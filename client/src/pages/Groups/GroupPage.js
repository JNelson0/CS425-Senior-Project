import {React, useState, useEffect} from "react"
import "./GroupPage.scss"
import BottomBar from "../PageOverlay/BottomBar.js"
import TopButtons from "../PageOverlay/TopButtons.js"
import {useGlobalContext} from "../../store"
import {useNavigate} from "react-router-dom"


const GroupPage = ({id, darkmode}) => {
    const {
        user,
        userState,
        isLoggedIn,
        userQuery,
        currentUserQuery,
        addMemberToGroupQuery,
        deleteMemberFromGroupQuery,
        getUserById,
        getGroupById,
        getGroupIdQuery,
        deleteGroupQuery,
    } = useGlobalContext()

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()
    const [display, setDisplay] = useState([])
    const [queried, setQueried] = useState(false)
    const [userQueried, setUserQueried] = useState(false)
    const [owner, setOwner] = useState()
    const [userIsOwner, setUserIsOwner] = useState(false)

    const [userToDelete, setUserToDelete] = useState("")
    const [userIdToDelete, setUserIdToDelete] = useState()
    const [deleteUser, setDeleteUser] = useState(false)
    const [usersToAdd, setUsersToAdd] = useState("")
    const [addUsers, setAddUsers] = useState(false)
    let groupUsers = []

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
        if(deleteUser) {
            ;(async () => {
                for (const userId of getGroupById(id).users) {
                    if(userToDelete === getUserById(userId).username)
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
        if(addUsers) {
            ;(async () => {
                console.log(usersToAdd)
                const inviteeIds = usersToAdd.split(',').map(Number)
                await addMemberToGroupQuery(id, {
                    userIds: inviteeIds
                })
            })()
                .catch(setError)
                .finally(() => {
                    setAddUsers(false)
                    refreshPage()
                })
        }
    }, [addUsers])

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
                if(getGroupById(id).owners[0] === user.id) {
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

    return (
        <div class={"theme " + (darkmode ? "light" : "dark")}>
            <div className="group">
                <TopButtons
                    className="tb"
                    showButtonNotification={false}
                    showButtonAdd={false}
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
                ) :<></>}
                    </div>
                    <div className="middleWrapper">
                        <div className="groupName">
                            <h2>Owner:</h2>
                            <span>{owner}</span>               
                            <h2>Users: </h2>
                            <ul>
                                {display.map(el => (
                                    <li>{el}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="groupEvents">
                            <h1>Group Events: </h1>
                        </div>
                    {userIsOwner ? (
                        <div className="groupDetails">
                        <div className="form">
                                <div className="list">
                                    <div>
                                        <label>Remove User:</label>
                                        <input
                                            type="text"
                                            value={userToDelete}
                                            onChange={handleChangeDeleteUser}
                                            placeholder="Enter single username"
                                        />
                                        <input 
                                            type="submit"
                                            value="Remove user"
                                            onClick={handleDeleteUser}
                                        /> 
                                    </div>
                                    <div>
                                        <label>Add Users:</label>
                                        <input 
                                            type="text"
                                            value={usersToAdd}
                                            onChange={handleChangeAddUsers}
                                            placeholder="Enter userIds separated by commas with no space"
                                        />
                                        <input
                                            type="submit"
                                            value="Add users"
                                            onClick={handleAddUsers} 
                                        />
                                    </div>
                                </div>
                        </div>
                    </div>
                    ) : (<></>)}
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
