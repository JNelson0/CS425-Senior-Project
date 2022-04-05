import React, {useEffect, useState, useRef} from "react"
import "./GroupDashboardPage.scss"
import BottomBar from "../PageOverlay/BottomBar.js"
import TopButtons from "../PageOverlay/TopButtons.js"
import {useGlobalContext} from "../../store"
import GroupContainer from "./GroupContainer.js"
import BackgroundImg from "../../img/wolf.png"
import AddGroup from "./AddGroup.js"

export default function GroupDashboardPage({setId, darkmode}) {
    const {
        user,
        isLoggedIn,
        currentUserQuery,
        currentUserGroupQuery,
        getGroupById,
        getUserById,
    } = useGlobalContext()

    const [addOpen, setAddOpen] = useState(false)
    const [queried, setQueried] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()
    let groups = []
    const [display, setDisplay] = useState([])

    useEffect(() => {
        ;(async () => {
            if (!isLoggedIn) {
                await currentUserQuery()
            }

            await currentUserGroupQuery()
        })()
            .catch(setError)
            .finally(() => {
                setQueried(true)
            })
    }, [])

    useEffect(() => {
        if (queried) {
            ;(async () => {
                groups = user.groups
                console.log(groups)
                console.log(getGroupById(groups[0]))
            })()
                .catch(setError)
                .finally(() => {
                    setDisplay([...groups])
                    setLoading(false)
                })
        }
    }, [queried])

    if (error) {
        return <>Error : {String(error)}</>
    }

    return (
        <div class={"theme " + (darkmode ? "light" : "dark")}>
            <div className="dashboard">
                <TopButtons
                    className="tb"
                    addOpen={addOpen}
                    setAddOpen={setAddOpen}
                    showButtonNotification={false}
                    showButtonAdd={true}
                />
                <AddGroup addOpen={addOpen} setAddOpen={setAddOpen} darkmode={darkmode}/>
                <div className="listWrapper">
                    <div className="spacer">
                        <img src={BackgroundImg} alt="Wolf" />
                    </div>
                    <div className="backgroundCell">
                        <div className="cellTwo"></div>
                    </div>
                    <div className={"middleSpacer " + (darkmode ? "light" : "dark")}>
                        <label>Current Groups</label>
                        {loading ? (
                            <div className="loading">
                                <span>LOADING</span>
                            </div>
                        ) : (
                            <div className="groupList">
                                {display.map(el => (
                                    <GroupContainer
                                        setId={setId}
                                        id={getGroupById(el).id}
                                        name={getGroupById(el).tag}
                                        darkmode={darkmode}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="spacer">
                        <img src={BackgroundImg} alt="Wolf" />
                    </div>
                </div>
                <BottomBar className="bb" />
            </div>
        </div>
    )
}
