import React from 'react'
import "./SettingsPage.scss"
import BottomBar from "./PageOverlay/BottomBar.js"
import TopButtons from "./PageOverlay/TopButtons.js"
import Settings from "./Settings/Settings.js"
import { getMode } from "./Settings/Settings.js"
import SettingsToggles from './Settings/Settings.js'
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Switch from '@mui/material/Switch';

var darkmode = getMode();
var orange = true;

export default function SettingsPage() {
  {console.log("darkmode: " + darkmode)}

  const [mode, setMode] = React.useState(false);

  return (
    <div class="settingspage">
      <TopButtons/>
      <div className="middle"> 
        <FormGroup>
          {/* <Switch onClick(console.log(darkmode)) /> */}
        </FormGroup>
        <SettingsToggles/>
      </div> 
      <BottomBar/>
    </div>
  )
}

