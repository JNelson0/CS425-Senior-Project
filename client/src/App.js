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

  const [toggle, setState] = React.useState(true);

  return (
    <BrowserRouter>
      <GlobalProvider>
        <Routes>

          <Route index path="/" element={<LoginPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="dashboard" element={<DashboardPage darkmode={toggle} id={id} setId={setId}/>} />
          <Route path="calendar" element={<CalendarPage darkmode={toggle}/>} />
          <Route path="event" element={<EventPage darkmode={toggle} id={id}/>} />
          <Route path="settings" element={<SettingsPage darkmode={toggle} setS={setState}/>} />
          <Route path={"event"+id} element={<EventPage id={id}/>} />

        </Routes>
      </GlobalProvider>
    </BrowserRouter>
  )
}

export default App
