import React, {useEffect, useState} from "react"
import "./DashboardPage.scss"
import BottomBar from "./PageOverlay/BottomBar.js"
import TopButtons from "./PageOverlay/TopButtons.js"
import {useGlobalContext} from "../store"
import EventContainer from "./EventContainer/EventContainer.js"
import BackgroundImg from "../img/wolf.png"
import Clock from "react-live-clock"
import AddEvent from "./AddEvent/AddEvent.js"
import EventPage from "./EventPage/EventPage"
import SettingsPage from "./SettingsPage"

export default function DashboardPage({setId, darkmode, setS}) {
    const {
        user,
        isLoggedIn,
        currentUserEventQuery,
        currentUserQuery,
        getEventById,
        deleteEventQuery,
    } = useGlobalContext()

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()

    const [settingsOpen, setSettingsOpen] = useState()
    const [eventId, setEventId] = useState()
    const [addOpen, setAddOpen] = useState(false)
    const [sorting, setSorting] = useState(false)

    const [display, setDisplay] = useState([])

    function swap(array, xp, yp) {
        var temp = array[xp]
        array[xp] = array[yp]
        array[yp] = temp
    }
    async function sortMonth(array) {
        var i, j, min_idx
        for (i = 0; i < array.length - 1; i++) {
            min_idx = i
            for (j = i + 1; j < array.length; j++)
                if (array[j].month < array[min_idx].month) min_idx = j
            swap(array, min_idx, i)
        }
        setDisplay([...array])
    }

    async function sortDay(array) {
        var i, j, min_idx
        for (i = 0; i < array.length - 1; i++) {
            min_idx = i
            for (j = i + 1; j < array.length; j++)
                if (
                    array[j].day < array[min_idx].day &&
                    array[j].month === array[min_idx].month
                )
                    min_idx = j
            swap(array, min_idx, i)
        }
        setDisplay([...array])
    }

    async function sortDates() {
        let dates = []

        for (const e of user.events) {
            if (getEventById(e) != undefined) {
                let temp = new Date(await getEventById(e).start)
                let id = getEventById(e).id
                let month = temp.getMonth()
                let day = temp.getDate()
                dates.push({id, month, day})
            }
        }
        await sortMonth(dates)
        await sortDay(dates)

        setSorting(false)
    }

    useEffect(() => {
        if (!addOpen) {
            ;(async () => {
                if (!isLoggedIn) {
                    await currentUserQuery()
                }

                await currentUserEventQuery()
            })()
                .catch(setError)
                .finally(() => {
                    setSorting(true)
                })
        }
    }, [addOpen])

    useEffect(() => {
        if (sorting) {
            ;(async () => {
                await sortDates()
            })()
                .catch(setError)
                .finally(() => {
                    setLoading(false)
                })
        }
    }, [sorting])

    const [IDToDelete, setIDToDelete] = useState(undefined)

    useEffect(() => {
        if (IDToDelete !== undefined) {
            ;(async () => {
                setEventId()
                let removed = display.splice(IDToDelete.index, 1)
                await deleteEventQuery(IDToDelete.deleteEvent)
            })()
                .catch(setError)
                .finally(() => {
                    setIDToDelete(undefined)
                })
        }
    }, [IDToDelete])

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
                    showButtonDeleteEvent={false}
                    setEventId={setEventId}
                    closeDashboard={eventId ? true : false}
                    setSettingsOpen={setSettingsOpen}
                    settingsOpen={settingsOpen}
                />
                <SettingsPage
                    darkmode={darkmode}
                    setS={setS}
                    settingsOpen={settingsOpen}
                />

                <div className="dashboardContent">
                    <div
                        className={
                            eventId ? "dashboardLeft active" : "dashboardLeft"
                        }
                    >
                        <AddEvent
                            addOpen={addOpen}
                            setAddOpen={setAddOpen}
                            darkmode={darkmode}
                        />
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
                                    <div className="eventList">
                                        {display.map((el, index) => (
                                            <EventContainer
                                                index={index}
                                                key={index}
                                                setId={setId}
                                                id={getEventById(el.id).id}
                                                name={getEventById(el.id).title}
                                                date={
                                                    new Date(
                                                        getEventById(
                                                            el.id,
                                                        ).start,
                                                    )
                                                }
                                                darkmode={darkmode}
                                                setEventId={setEventId}
                                                eventId={eventId}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="spacer">
                                <img src={BackgroundImg} alt="Wolf" />
                            </div>
                        </div>
                    </div>
                    <div
                        className={
                            eventId ? "dashboardRight active" : "dashboardRight"
                        }
                    >
                        {eventId ? (
                            <EventPage
                                id={eventId.id}
                                index={eventId.index}
                                darkmode={darkmode}
                                topbar={false}
                                bottombar={false}
                                setIDToDelete={setIDToDelete}
                            />
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
                <BottomBar className="bb" />
            </div>
        </div>
    )
}
