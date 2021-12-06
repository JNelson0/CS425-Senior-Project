import React, { useState } from 'react';
import "./CalendarPage.scss"
import BottomBar from "./PageOverlay/BottomBar.js"
import Calendar from 'react-calendar';
import TopButtons from "./PageOverlay/TopButtons.js"
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import EventContainer from "./EventContainer/EventContainer.js"
import {useGlobalContext} from "../store"
//import data from "./DataTest.json"
import RevoCalendar from 'revo-calendar'

const CalendarPage = ({darkmode}) => {
  const [value, setValue] = React.useState(new Date());
  function onChange(nextValue) {
    setValue(nextValue);
  }
  return (
    <div class={"theme " + (darkmode ? "light" : "dark")}>
      <div className="calendarPage">
        <TopButtons/>
        <div className="middle">
          <div className="calendar">
          <RevoCalendar
            style={{
              borderRadius: "5px",
              border: "5px solid #4F6995"
              }}
              allowAddEvent={true}
              detailDateFormat =  "MM/DD/YYYY"
              //addEvent = {addEvent}
              /></div>
      </div>
        <BottomBar/>
      </div> 
    </div> 
  )
}
  
export default CalendarPage


