import React, {useState} from "react"
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
    const {user, getEventById, isLoggedIn} = useGlobalContext()
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)

    if (loading && isLoggedIn) {
        user.events.map(el => {
            list.push({
                Id: parseInt(getEventById(el).id),
                Subject: getEventById(el).title,
                StartTime: getEventById(el).start,
                EndTime: getEventById(el).finish,
            })
        })
        setLoading(false)
    }

    return (
        <div class={"theme " + (darkmode ? "light" : "dark")}>
            <div className="calendarPage">
                <TopButtons />
                {console.log(list)}
                <div className="middle">
                    <div class="calendar">
                        {console.log("Trying to load Calendar")}
                        <ScheduleComponent
                            width="100%"
                            height="100%"
                            selectedDate={new Date(2022, 1, 14)}
                            eventSettings={{dataSource: list}}
                        >
                            <Inject
                                services={[Day, Week, WorkWeek, Month, Agenda]}
                            />
                        </ScheduleComponent>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CalendarPage
