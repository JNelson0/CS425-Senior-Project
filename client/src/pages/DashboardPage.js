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
    const [sorting, setSorting] = useState(false)
    const [error, setError] = useState()

    const [display, setDisplay] = useState([])

    function swap(array, xp, yp) {
        var temp = array[xp]
        array[xp] = array[yp]
        array[yp] = temp
    }

    async function selectionSort(array) {
        var i, j, min_idx
        for (i = 0; i < array.length - 1; i++) {
            min_idx = i
            for (j = i + 1; j < array.length; j++)
                if (array[j].day < array[min_idx].day) min_idx = j
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
        await selectionSort(dates)
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
                    showButtonNotification={true}
                    showButtonAdd={true}
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
                                {display.map(el => (
                                    <EventContainer
                                        key={getEventById(el.id).id}
                                        setId={setId}
                                        id={getEventById(el.id).id}
                                        name={getEventById(el.id).title}
                                        date={
                                            new Date(getEventById(el.id).start)
                                        }
                                        darkmode={darkmode}
                                    />
                                ))}
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
