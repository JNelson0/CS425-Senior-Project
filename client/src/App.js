import React from "react"
import {GlobalProvider} from "./store"
import {
  DashboardPage,
  LoginPage,
  CalendarPage,
  SettingsPage,
  EventPage,
} from "./pages"
import {BrowserRouter} from "react-router-dom"
import {Routes, Route} from "react-router"

const App = () => {

  const [toggle, setState] = React.useState(true);

  return (
    <BrowserRouter>
      <GlobalProvider>
        <Routes>
          <Route index path="/" element={<LoginPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="dashboard" element={<DashboardPage darkmode={toggle}/>} />
          <Route path="calendar" element={<CalendarPage darkmode={toggle}/>} />
          <Route path="event" element={<EventPage darkmode={toggle}/>} />
          <Route path="settings" element={<SettingsPage darkmode={toggle} setS={setState}/>} />
        </Routes>
      </GlobalProvider>
    </BrowserRouter>
  )
}

export default App
