import {React, useEffect, useState} from "react"
import "./Settings.scss"
import 'dotenv/config'
import { GoogleLogin } from "react-google-login"
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Switch from '@mui/material/Switch';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/Radio';
import LogoutIcon from '@mui/icons-material/Logout';

import {useGlobalContext} from "../../store"
import {Navigate} from "react-router"

//please leave unused imports for the time being, thanks!

var state = true;

export function getMode(){
  return state;
}

function flipMode(){
  window['state'] = false;
}

export default function SettingsToggles({toggle, setS}) {
  
  const [redirectTo, setRedirectTo] = useState()

  const [error, setError] = useState()
  const {
    logoutUser,
    generateGoogleTokensQuery,
  } = useGlobalContext()
  const [logout, setLogout] = useState(false)
  const [toggle_state, setState] = useState({
    //default states
    darkmode: false,
    //setting2: false,
  });

  

  //{console.log(toggle_state.darkmode)}
  //{console.log("state: " + state)}

  const [radio_state, setRadio] = useState('pounds');

  const toggleHandler = (event) => {
    setState({
      ...toggle_state,
      [event.target.name]: event.target.checked,
      //event updates setting, be it changing to dark mode or something else
    });
    setS(!toggle);
  };

  const radioHandler = (event) => {
    setRadio({
      ...radio_state,
      [event.target.name]: event.target.checked,
      //event updates radio for events
    });
  };

  const responseGoogle = response => {
    generateGoogleTokensQuery(response)
  }
    
  const handleLogout = (event) => {
    event.preventDefault()
    setLogout(true)
 
  }


  useEffect(() => {
    if(logout) {
      ;(async () => {
        await logoutUser()
      })()
        .catch(setError)
        
        .finally(() => {
          setRedirectTo("/")
        })
        console.log(error)
    }
    
  }, [logout])

  if (redirectTo) {
    return <Navigate to={redirectTo} />
  }

  return (
    <div className="settings">
      <div className="buttonWrapper">
        <FormControl>
            <label>Visual</label>
            <FormGroup>
                <FormControlLabel
                control={
                    <Switch checked={!toggle} onChange={toggleHandler} name="darkmode"/>
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

               <label>Connections</label>
               <div className="googleLogin">
                 {/* <GoogleLogin 
                   clientId={String(process.env.REACT_APP_GOOGLE_CLIENT_ID)}
                   buttonText="Google Login"
                   onSuccess={responseGoogle}
                   onFailure={responseGoogle}
                   cookiePolicy={'single_host_origin'}
                 /> */}
              
                  <GoogleLogin 
                    clientId={String(process.env.REACT_APP_GOOGLE_CLIENT_ID)}
                    buttonText="Google Login"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                    accessType="offline"
                    responseType="code"
                    scope="https://www.googleapis.com/auth/calendar"
                  />
              </div>
            </FormGroup>
        </FormControl>

        <button className = "logoutButton" onClick={handleLogout}><LogoutIcon sx={{fontSize: 'large'}}/>&nbsp; LOGOUT</button>
        {/* <FormControl>
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
        </FormControl> */}
        </div>
    </div>
  );
}