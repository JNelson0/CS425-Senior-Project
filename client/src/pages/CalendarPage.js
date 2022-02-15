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
import MapList from "./MapList"

const CalendarPage = ({darkmode}) => {
    const {user, isLoggedIn, currentUserEventQuery} = useGlobalContext()
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)

    async function loadUser() {
        const delay = ms => new Promise(res => setTimeout(res, ms))
        console.log("HEHEHRHEHRHEHREHR")
        if (loading && isLoggedIn) {
            await currentUserEventQuery()
            await delay(500)
            console.log("Load for 0.5 seconds")
            setLoading(false)
        }
    }

    return (
        <div class={"theme " + (darkmode ? "light" : "dark")}>
            {loading ? (
                <MapList list={list} setLoading={setLoading} />
            ) : (
                <div className="calendarPage" onLoad={loadUser}>
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
                    </div>
                </div>
            )}
        </div>
    )
}
export default CalendarPage
