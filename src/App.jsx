
import {Route, Routes, BrowserRouter} from "react-router-dom";

import Dashboard from "./components/dashboard/Dashboard.jsx";
import Calendar from "./components/calendar/Calendar.jsx";
import Settings from "./components/settings/Settings.jsx";

export default function App() {

    return (
        <div className="app">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Dashboard/>}/>
                <Route path="calendar" element={<Calendar/>}/>
                <Route path="settings" element={<Settings/>}/>
              </Routes>
            </BrowserRouter>
        </div>
    );
}


