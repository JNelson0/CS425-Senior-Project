import React from 'react'
import "./TopButtons.scss"
import {Link} from 'react-router-dom'
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';

export default function TopButtons() {
    return (
        <div className="topWrapper">
            <Link to="/settings" id="button"><SettingsSuggestIcon fontSize="large"/></Link>

            <Link to="/" id="home"><HomeIcon fontSize="large"/></Link>

            <button id="button" onClick={() => console.log("Add button clicked!")}>
                <AddIcon fontSize="large"/>
            </button>
        </div>
    )
}
