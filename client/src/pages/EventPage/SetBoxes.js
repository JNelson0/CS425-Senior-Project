import React from "react"
import "./SetBoxes.scss"
export default function SetBoxes({index}) {
    return (
        <div className="setBoxes">
            <div className="index">Set {index + 1}</div>
            <input type="text" placeholder="Enter Weight" />
        </div>
    )
}
