import React, {useState, useEffect} from "react"
import "./CalendarPage.scss"
import TopButtons from "./PageOverlay/TopButtons.js"
import {useGlobalContext} from "../store"
import SettingsPage from "./SettingsPage"

import {
    ScheduleComponent,
    Day,
    Week,
    WorkWeek,
    Month,
    Agenda,
    Inject,
    ViewsDirective,
    ViewDirective,
} from "@syncfusion/ej2-react-schedule"
import {id} from "date-fns/locale"

const CalendarPage = ({darkmode, setS}) => {
    const {
        user,
        getEventById,
        isLoggedIn,
        currentUserQuery,
        currentUserEventQuery,
        deleteEventQuery,
        createEventQuery,
    } = useGlobalContext()

    const [settingsOpen, setSettingsOpen] = useState()

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

    const [IDToDelete, setIDToDelete] = useState(undefined)

    useEffect(() => {
        if (IDToDelete !== undefined) {
            ;(async () => {
                await deleteEventQuery(IDToDelete)
            })()
                .catch(setError)
                .finally(() => {
                    setIDToDelete(undefined)
                })
        }
    }, [IDToDelete])

    const [eventToAdd, setEventToAdd] = useState(undefined)
    useEffect(() => {
        if (eventToAdd !== undefined) {
            ;(async () => {
                //console.log(eventToAdd)
                await createEventQuery(eventToAdd)
            })()
                .catch(setError)
                .finally(() => {
                    setEventToAdd(undefined)
                })
        }
    }, [eventToAdd])

    const onActionBegin = args => {
        console.log(args)
        console.log(args.requestType)
        if (args.requestType === "toolbarItemRendering") {
            // This block is execute before toolbarItem render
        }
        if (args.requestType === "dateNavigate") {
            // This block is executed before previous and next navigation
        }
        if (args.requestType === "viewNavigate") {
            // This block is execute before view navigation
        }
        if (args.requestType === "eventCreate") {
            // This block is execute before an appointment create
            setEventToAdd({
                title: args.data[0].Subject,
                description: args.data[0].Description || "",
                type: "STANDARD",
                start: args.data[0].StartTime,
                finish: args.data[0].EndTime,
            })
            console.log(args.data[0])
        }
        if (args.requestType === "eventChange") {
            // This block is execute before an appointment change
        }
        if (args.requestType === "eventRemove") {
            setIDToDelete(args.data[0].Id)
            //console.log(args.data[0].Id)
        }
    }

    return (
        <div class={"theme " + (darkmode ? "light" : "dark")}>
            <div className="calendarPage">
                <TopButtons
                    className="tb"
                    showButtonNotification={false}
                    showButtonAdd={false}
                    settingsOpen={settingsOpen}
                    setSettingsOpen={setSettingsOpen}
                />
                <SettingsPage
                    darkmode={darkmode}
                    setS={setS}
                    settingsOpen={settingsOpen}
                />
                <div className="middle">
                    {loading ? (
                        <div className="loading">
                            <span>LOADING</span>
                        </div>
                    ) : (
                        <div class={"calendar" + (darkmode ? "" : " dark")}>
                            <ScheduleComponent
                                width="100%"
                                height="100%"
                                selectedDate={new Date(new Date())}
                                eventSettings={{dataSource: list}}
                                actionBegin={onActionBegin}
                            >
                                <ViewsDirective>
                                    <ViewDirective option="Day" />
                                    <ViewDirective option="Week" />
                                    <ViewDirective option="Month" />
                                    <ViewDirective option="Agenda" />
                                </ViewsDirective>
                                <Inject services={[Day, Week, Month, Agenda]} />
                            </ScheduleComponent>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
export default CalendarPage
