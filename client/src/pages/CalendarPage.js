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
    const [value, setValue] = React.useState(new Date())
    function onChange(nextValue) {
        setValue(nextValue)
    }

    return (
        <div class={"theme " + (darkmode ? "light" : "dark")}>
            <div className="calendarPage">
                <TopButtons />
                <div className="middle">
                    <div class="calendar">
                        {
                            <ScheduleComponent width="100%" height="550px">
                                <link
                                    href="//cdn.syncfusion.com/ej2/ej2-base/styles/material.css"
                                    rel="stylesheet"
                                />
                                <link
                                    href="//cdn.syncfusion.com/ej2/ej2-react-buttons/styles/material.css"
                                    rel="stylesheet"
                                />
                                <link
                                    href="//cdn.syncfusion.com/ej2/ej2-react-calendars/styles/material.css"
                                    rel="stylesheet"
                                />
                                <link
                                    href="//cdn.syncfusion.com/ej2/ej2-react-dropdowns/styles/material.css"
                                    rel="stylesheet"
                                />
                                <link
                                    href="//cdn.syncfusion.com/ej2/ej2-react-inputs/styles/material.css"
                                    rel="stylesheet"
                                />
                                <link
                                    href="//cdn.syncfusion.com/ej2/ej2-react-navigations/styles/material.css"
                                    rel="stylesheet"
                                />
                                <link
                                    href="//cdn.syncfusion.com/ej2/ej2-react-popups/styles/material.css"
                                    rel="stylesheet"
                                />
                                <link
                                    href="//cdn.syncfusion.com/ej2/ej2-react-schedule/styles/material.css"
                                    rel="stylesheet"
                                />
                                <link
                                    href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
                                    rel="stylesheet"
                                />
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
                        }
                    </div>
                </div>
                <BottomBar />
            </div>
        </div>
    )
}
export default CalendarPage
