import React, {useState} from "react"
import "./CalendarPage.scss"
import BottomBar from "./PageOverlay/BottomBar.js"
import TopButtons from "./PageOverlay/TopButtons.js"
import EventContainer from "./EventContainer/EventContainer.js"
import {useGlobalContext} from "../store"
//import data from "./DataTest.json"
import RevoCalendar from "revo-calendar"
import * as ReactDOM from "react-dom"

import {
    ScheduleComponent,
    Day,
    Week,
    WorkWeek,
    Month,
    Agenda,
    Inject,
} from "@syncfusion/ej2-react-schedule"
import {render} from "sass"

const CalendarPage = ({darkmode}) => {
    const {user} = useGlobalContext()
    const list = []

    return (
        <div class={"theme " + (darkmode ? "light" : "dark")}>
            <div className="calendarPage">
                <TopButtons />
                {user.data.events.map(e => {
                    list.push({
                        Id: parseInt(e.id),
                        Subject: e.title,
                        StartTime: e.start,
                        EndTime: e.finish,
                    })
                })}
                <div className="middle">
                    <div class="calendar">
                        <ScheduleComponent
                            width="100%"
                            height="550px"
                            selectedDate={new Date(2022, 1, 14)}
                            eventSettings={{dataSource: list}}
                        >
                            <Inject
                                services={[Day, Week, WorkWeek, Month, Agenda]}
                            />
                        </ScheduleComponent>
                    </div>
                </div>
                <BottomBar />
            </div>
        </div>
    )
}
export default CalendarPage
