import {React, useState} from "react"
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
  const[id, setId] = useState("");
  return (
    <BrowserRouter>
      <GlobalProvider>
        <Routes>
          <Route index path="/" element={<DashboardPage id={id} setId={setId}/>} />
          <Route path="login" element={<LoginPage />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="event" element={<EventPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path={"event"+id} element={<EventPage id={id}/>} />
        </Routes>
      </GlobalProvider>
    </BrowserRouter>
  )
}

export default App
