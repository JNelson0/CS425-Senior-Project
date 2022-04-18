import {React, useState, useEffect} from "react"
import "./GroupPage.scss"
import BottomBar from "../PageOverlay/BottomBar.js"
import TopButtons from "../PageOverlay/TopButtons.js"
import {useGlobalContext} from "../../store"
import {useNavigate} from "react-router-dom"
import EventContainer from "../EventContainer/EventContainer.js"
import DownloadIcon from "@mui/icons-material/Download"
import SettingsPage from "../SettingsPage"
import ReactExport from "react-export-excel";

const GroupPage = ({setId, id, darkmode, setS}) => {
    const {
        user,
        userState,
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
    const [displayEvents, setDisplayEvents] = useState([])
    const [queried, setQueried] = useState(false)
    const [userQueried, setUserQueried] = useState(false)
    const [eventQueried, setEventQueried] = useState(false)
    const [exerciseQueried, setExerciseQueried] = useState(false)
    const [owner, setOwner] = useState()
    const [userIsOwner, setUserIsOwner] = useState(false)
    const [userResponseData, setUserResponseData] = useState(false)
    const [eventIsWorkout, setEventIsWorkout] = useState(false)
    const [columnHeaders, setColumnHeaders] = useState(false)   
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
    const ExcelFile = ReactExport.ExcelFile;
    const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
    const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

    let groupUsers = []
    let groupEvents = []
    let exerciseResponses = []
    let exercises = []
    let colHeaders = ["Username"]

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
                    /*await eventFromIdQuery(eventId)
                    if(getEventById(eventId).type === "WORKOUT") {
                    setEventIsWorkout(true)*/
                //}
                }
                /*await eventFromIdQuery(getEventById(id).type)
                if(getEventById(id).type === "WORKOUT") {
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
                console.log(groupUsers)

            })()
                .catch(setError)
                .finally(() => {
                    setDisplay([...groupUsers])
                    setLoading(false)
                })
        }
    }, [userQueried])

///////////////////////////////////////
useEffect(() => {
        if (eventQueried) {
            ;(async () => {
                for (const eventId of getGroupById(id).events) {
                   getExercisesFromEventIdQuery(eventId)
                }

            })()
                .catch(setError)
                .finally(() => {
                    setExerciseQueried(true)
                    setColumnHeaders([...colHeaders])
                    setLoading(false)
                })
        }
    }, [eventQueried])
useEffect(() => {
        if(exerciseQueried){
                  ;(async () => {
                         for ( const eventId in getGroupById(id).events){
                             for(const exerciseId in getEventById(eventId).exercises){
                                let event = await getEventById(eventId)
                                colHeaders.push(event.exercises.name)
                                console.log(exercises)
                                userResponseData.push(event.getExerciseResponseFromExerciseIdQuery(exerciseId))
                                console.log(userResponseData)
                          }
                     }
                   })()
                    .catch(setError)
                    .finally(() => {
                    setExerciseQueried(false)            
            })
        }
   }, [exerciseQueried])
//////////////////////////////////////////
    useEffect(() => {
        if (eventQueried) {
            ;(async () => {
                for (const eventId of getGroupById(id).events) {
                    groupEvents.push(getEventById(eventId).title)
                }
                
            })()
                .catch(setError)
                .finally(() => {
                    setDisplayEvents([...groupEvents])
                    setLoading(false)
                })
        }
    }, [eventQueried])





    const dataToExport = [       
        {
          columns: colHeaders,
          data: [
            ["Johnson", "Finance"],
            ["Monika", "IT"],
            ["Konstantina", "IT Billing"],
            ["John", "HR"],
            ["Josef", "Testing"],
          ],
        },
      ];
      
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
                                    <li>{el}{userIsOwner ? (
                                    <ExcelFile element={<button>
                                        <DownloadIcon></DownloadIcon>
                                    </button>}>
                                    <ExcelSheet dataSet={dataToExport} name="Event Details"/>
                                    </ExcelFile>
                                    ):(<></>)}
                                    </li>
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
                </div>//middle
                )}

                <div className="bottomBar">
                    <BottomBar />
                </div>
       </div>
       </div>       
            
    )
}

export default GroupPage
