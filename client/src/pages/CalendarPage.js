import React, {useState, useEffect} from "react"
import "./CalendarPage.scss"
import TopButtons from "./PageOverlay/TopButtons.js"
import {useGlobalContext} from "../store"

import {
    ScheduleComponent,
    Day,
    Week,
    WorkWeek,
    Month,
    Agenda,
    Inject,
} from "@syncfusion/ej2-react-schedule"

const CalendarPage = ({darkmode}) => {
    const {
        user,
        getEventById,
        isLoggedIn,
        currentUserQuery,
        currentUserEventQuery,
    } = useGlobalContext()
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()

    useEffect(() => {
        ;(async () => {
            if (!isLoggedIn) {
                await currentUserQuery()
            }

            await currentUserEventQuery()

            await user.events.map(el => {
                list.push({
                    Id: parseInt(getEventById(el).id),
                    Subject: getEventById(el).title,
                    StartTime: getEventById(el).start,
                    EndTime: getEventById(el).finish,
                })
            })
        })()
            .catch(setError)
            .finally(() => {
                setLoading(false)
            })
    }, [])

    return (
        <div class={"theme " + (darkmode ? "light" : "dark")}>
            <div className="calendarPage">
                <TopButtons />
                <div className="middle">
                    {loading ? (
                        <div className="loading">
                            <span>LOADING</span>
                        </div>
                    ) : (
                        <div class="calendar">
                            <ScheduleComponent
                                width="100%"
                                height="100%"
                                selectedDate={new Date(new Date())}
                                eventSettings={{dataSource: list}}
                            >
                                <Inject
                                    services={[
                                        Day,
                                        Week,
                                        WorkWeek,
                                        Month,
                                        Agenda,
                                    ]}
                                />
                            </ScheduleComponent>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
export default CalendarPage
