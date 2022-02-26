import {React, useEffect, useState} from "react"
import {GlobalProvider} from "./store"
import {DashboardPage, LoginPage, CalendarPage, SettingsPage} from "./pages"
import EventPage from "./pages/EventPage/EventPage.js"
import {BrowserRouter} from "react-router-dom"
import {Routes, Route} from "react-router"
import {Navigate} from "react-router"

export default function App() {
    const [id, setId] = useState()

    const [toggle, setState] = useState(true)
    const [redirectTo, setRedirectTo] = useState()

    return (
        <BrowserRouter>
            <GlobalProvider>
                <Routes>
                    <Route index path="/" element={<LoginPage />} />
                    <Route
                        path="dashboard"
                        element={
                            <DashboardPage darkmode={toggle} setId={setId} />
                        }
                    />
                    <Route
                        path="calendar"
                        element={<CalendarPage darkmode={toggle} />}
                    />
                    <Route
                        path="event"
                        element={<EventPage darkmode={toggle} id={id} />}
                    />
                    <Route
                        path="settings"
                        element={
                            <SettingsPage darkmode={toggle} setS={setState} />
                        }
                    />
                    <Route
                        path={"event" + id}
                        element={<EventPage id={id} darkmode={toggle} />}
                    />
                    <Route
                        path="*"
                        element={
                            <NoMatch
                                redirectTo={redirectTo}
                                setRedirectTo={setRedirectTo}
                            />
                        }
                    />
                </Routes>
            </GlobalProvider>
        </BrowserRouter>
    )
}

const NoMatch = ({redirectTo, setRedirectTo}) => {
    useEffect(() => {
        setRedirectTo("/dashboard")
    }, [])
    if (redirectTo) {
        return <Navigate to={redirectTo} />
    }
    return <div></div>
}
