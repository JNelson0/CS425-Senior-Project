import React from 'react';
import {Route, Routes, BrowserRouter} from "react-router-dom";

import Dashboard from "./components/dashboard/Dashboard";
import Calendar from "./components/calendar/Calendar";
import Profile from "./components/profile/Profile";
import Settings from "./components/settings/Settings";
import Login  from "./components/login/Login";

export default function App() {

    return (
        <div className="app">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Dashboard/>}/>
                <Route path="calendar" element={<Calendar/>}/>
                <Route path="profile" element={<Profile/>}/>
                <Route path="settings" element={<Settings/>}/>
                <Route path="login" element={<Login/>}/>

              </Routes>
            </BrowserRouter>
        </div>
    );
}


