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
    let groupUsers = []

    let navigate = useNavigate()

    const routeBackToGroups = () => {
        let path = `group`
        navigate(path)
    }

    const handleDeleteEvent = () => {
        deleteGroupQuery(id)
        routeBackToGroups()
    }

    useEffect(() => {
        ;(async () => {
            id = await getGroupIdQuery(id)
            await currentUserQuery()
        })()
            .catch(setError)
            .finally(() => {
                setQueried(true)
            })
    }, [])

    useEffect(() => {
        if(queried) {
            ;(async () => {
                for(const userId of getGroupById(id).users) {
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
        if(userQueried) {
            ;(async () => {
                for(const userId of getGroupById(id).users) {
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
                <TopButtons showButtonAdd={false} />
                {loading ? (
                    <div className="loading">
                        <span>LOADING</span>
                    </div>
                ) : (
                    <div className="middle">
                        <div className="group">
                            <h1>{getGroupById(id).tag}</h1>
                            <h2>Owner: </h2>
                            <span>{owner}</span>
                            <h2>Users: </h2>
                            <ul>
                                {display.map(el => (
                                    <span>{el}</span>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
                {userIsOwner ? (
                    <button onClick={handleDeleteEvent}>
                        DELETE GROUP
                    </button>
                ) : (
                    <span>
                        You are a normal user of this group
                    </span>
                )}
            </div>
        </div>
    )
}

export default GroupPage