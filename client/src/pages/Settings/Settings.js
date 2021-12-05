import React from 'react'
import "./Settings.scss"
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Switch from '@mui/material/Switch';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/Radio';

var state = false;

export function getMode(){
  return state;
}

export default function SettingsToggles() {
  
  
  const [toggle_state, setState] = React.useState({
    //default states
    darkmode: true,
    //setting2: false,
  });

  

  {console.log(toggle_state.darkmode)}

  const [radio_state, setRadio] = React.useState('pounds');

  const toggleHandler = (event) => {
    setState({
      ...toggle_state,
      [event.target.name]: event.target.checked,
      state: toggle_state.darkmode
      //event updates setting, be it changing to dark mode or something else
    });
  };

  const radioHandler = (event) => {
    setRadio({
      ...radio_state,
      [event.target.name]: event.target.checked,
      //event updates radio for events
    });
  };

  return (
    <div className="settings">
      <div className="settingsWrapper">

        <FormControl>
            <label>Visual</label>
            <FormGroup>
                <FormControlLabel
                control={
                    <Switch checked={toggle_state.darkmode} onChange={toggleHandler} name="darkmode"/>
                }
                label="Dark mode"
                />

                {
                //written as group so more settings can be added as needed
                }
                {/* <FormControlLabel
                control={
                    <Switch checked={toggle_state.setting2} onChange={toggleHandler} name="setting2" />
                }
                label="setting2"
                /> */}
                
            </FormGroup>
        </FormControl>


        <FormControl>
            <label>Units</label>
            <RadioGroup 
                aria-label="units"
                name ="unit changing settings"
                value={radio_state}
                onChange={radioHandler}
            >
              
                <FormControlLabel value="pounds" control={<Radio />} label="lbs." />
                <FormControlLabel value="kilograms" control={<Radio />} label="kgs." />
            </RadioGroup>
        </FormControl>
        </div>
    </div>
  );
}