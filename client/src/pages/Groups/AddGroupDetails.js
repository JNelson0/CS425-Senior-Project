import {React, useState, useEffect} from "react"
import "./AddGroupDetails.scss"
import {useGlobalContext} from "../../store"

export default function AddGroupDetails({
    setAddOpen,
    addOpen,
    groupDetails,
    setGroupDetails,
}) {

    const handleChange = e => {
        setGroupDetails({
            ...groupDetails,
            [e.target.name]: e.target.value,
        })
    }

    return (
        <div className="groupDetails">
            <div className="form">
                <div className="list">
                    <div>
                        <label>Name:</label>
                        <input 
                            type="text"
                            name="tag"
                            value={groupDetails.tag}
                            onChange={handleChange}
                            placeholder="Enter Group Title"
                            required
                        />
                    </div>
                    <div className="description">
                        <label>Invitees:</label>
                        <textarea 
                            type="text"
                            name="usernameCSV"
                            value={groupDetails.usernameCSV}
                            onChange={handleChange}
                            placeholder="Enter usernames of invitees, separated by commas (i.e.: \'username,username2,username3\')"
                            required
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}