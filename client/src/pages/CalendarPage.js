import React, { useState } from 'react';
import "./CalendarPage.scss"
import BottomBar from "./PageOverlay/BottomBar.js"
import Calendar from 'react-calendar';
import TopButtons from "./PageOverlay/TopButtons.js"
import 'react-calendar/dist/Calendar.css';



const CalendarPage = () => {
const [value, setValue] = useState(new Date());
function onChange(nextValue) {
  setValue(nextValue);
}
  return (
    <div className="calendar">
      <TopButtons/>
      <div className="middle"> 
        <Calendar
            onChange={onChange}
            value={value}/>
            </div>
              
      <BottomBar/>
    </div>    
  )
}


export default CalendarPage
