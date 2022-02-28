import {React, useState} from "react"
import {GlobalProvider} from "./store"
import {DashboardPage, LoginPage, CalendarPage, SettingsPage} from "./pages"
import EventPage from "./pages/EventPage/EventPage.js"
import GroupDashboardPage from "./pages/Groups/GroupDashboardPage.js"
import {BrowserRouter} from "react-router-dom"
import {Routes, Route} from "react-router"
import GroupPage from "./pages/Groups/GroupPage.js"

const App = () => {
    const [id, setId] = useState()

    const [toggle, setState] = useState(true)

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
                        path="group"
                        element={<GroupDashboardPage setId={setId} darkmode={toggle} />}
                    />
                    <Route
                        path={"groups" + id}
                        element={<GroupPage id={id} darkmode={toggle} />} 
                    />
        
                </Routes>
            </GlobalProvider>
        </BrowserRouter>
    )
}

export default App
