import React, { useState } from 'react';
import "./CalendarPage.scss"
import BottomBar from "./PageOverlay/BottomBar.js"
import Calendar from 'react-calendar';
import TopButtons from "./PageOverlay/TopButtons.js"
//import 'react-calendar/dist/Calendar.css';
//import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import EventContainer from "./EventContainer/EventContainer.js"
import {useGlobalContext} from "../store"
import data from "./DataTest.json"


const CalendarPage = () => {
  const [value, setValue] = React.useState(new Date());
  function onChange(nextValue) {
    setValue(nextValue);
  }

    return (
      
      <div className="calendar">
        <TopButtons/>
        <div className="middle"> 
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <StaticDatePicker
              orientation="landscape"
              openTo="day"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params)=> <TextField {...params}/>}
            />
          </LocalizationProvider>
      <BottomBar/>
          </div>
        </div>
    );
  
  
  } 
  
export default CalendarPage


