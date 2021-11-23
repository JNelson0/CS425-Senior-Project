import React from 'react'
import "./Settings.scss"
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
//import FormHelperText from '@mui/material/FormHelperText';
import Switch from '@mui/material/Switch';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/Radio';


export default function SettingsToggles() {
  const [toggle_state, setState] = React.useState({
    darkmode: false,
    setting2: false,
  });
  const [radio_state, setRadio] = React.useState('pounds');

  const toggleHandler = (event) => {
    setState({
      ...toggle_state,
      //event updates setting, be it changing to dark mode or something else
      //[event]: event,
    });
  };

  const radioHandler = (event) => {
    setRadio({
      ...radio_state,
      //event updates radio for events
      //[event]: event,
    });
  };

  return (
    <div className="settingsWrapper">
        <FormControl component="toggles">
            <FormLabel component="legend">Visual</FormLabel>
            <FormGroup>
                <FormControlLabel
                value="start"
                control={
                    <Switch checked={toggle_state.darkmode} onChange={toggleHandler} name="darkmode" />
                }
                label="Dark mode - not implemented"
                />
                
                {
                //written as group so more settings can be added as needed
                /* <FormControlLabel
                control={
                    <Switch checked={toggle_state.setting2} onChange={toggleHandler} name="setting2" />
                }
                label="setting2"
                /> */}
            </FormGroup>
        </FormControl>

        <FormControl component="radios">
            <FormLabel component="legend">Units</FormLabel>
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
  );
}