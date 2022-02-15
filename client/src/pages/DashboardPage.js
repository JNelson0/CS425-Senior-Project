import React, {useEffect, useState} from "react"
import "./DashboardPage.scss"
import BottomBar from "./PageOverlay/BottomBar.js"
import TopButtons from "./PageOverlay/TopButtons.js"
import {useGlobalContext} from "../store"
import EventContainer from "./EventContainer/EventContainer.js"
import BackgroundImg from "../img/wolf.png"
import Clock from "react-live-clock"
import AddEvent from "./AddEvent/AddEvent.js"

export default function DashboardPage({setId, darkmode}) {
    const {
        user,
        isLoggedIn,
        currentUserEventQuery,
        currentUserQuery,
        getEventById,
    } = useGlobalContext()

    const [addOpen, setAddOpen] = useState(false)
    const [loading, setLoading] = useState(true)
    const delay = ms => new Promise(res => setTimeout(res, ms))

    async function loadUser() {
        if (loading && isLoggedIn) {
            await currentUserEventQuery()
            await delay(500)
            console.log("Load for 0.5 seconds")
            setLoading(false)
        } else {
            await currentUserQuery()
            console.log("HERE")
        }
    }

    return (
        <div class={"theme " + (darkmode ? "light" : "dark")}>
            <div className="dashboard" onLoad={loadUser}>
                <TopButtons
                    className="tb"
                    addOpen={addOpen}
                    setAddOpen={setAddOpen}
                    showButtonNotification={false}
                    showButtonAdd={false}
                />
                <AddEvent addOpen={addOpen} setAddOpen={setAddOpen} />
                <div className="listWrapper">
                    <div className="spacer">
                        <img src={BackgroundImg} alt="Wolf" />
                    </div>
                    <div className="middleSpacer">
                        <Clock
                            className="clock"
                            format={"h:mm:ss a"}
                            ticking={true}
                            timezone={"US/Pacific"}
                        />

                        {loading ? (
                            <div className="loading">
                                <span>LOADING</span>
                            </div>
                        ) : (
                            <ul>
                                {user.events.map(el =>
                                    getEventById(el) !== undefined ? (
                                        <EventContainer
                                            key={getEventById(el).id}
                                            setId={setId}
                                            id={getEventById(el).id}
                                            name={getEventById(el).title}
                                            date={
                                                new Date(getEventById(el).start)
                                            }
                                            darkmode={darkmode}
                                        />
                                    ) : (
                                        console.log("FINISH EVENT DELETE")
                                    ),
                                )}
                            </ul>
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
