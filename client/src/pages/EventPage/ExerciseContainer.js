import React, {useState, useEffect} from "react"
import "./ExerciseContainer.scss"
import arrow from "../../img/down.png"
import SetBoxes from "./SetBoxes"
import CloseIcon from "@mui/icons-material/Close"

export default function ExerciseContainer({type, name, sets, reps, id}) {
    const [active, setActive] = useState(false)
    const setNumbers = new Array(parseInt(sets))

    return (
        <div className={active ? "exercise active" : "exercise"}>
            <div
                className={
                    active ? "exerciseComponent active" : "exerciseComponent"
                }
                // onClick={() => {
                //     setActive(!active)
                // }}
            >
                <div
                    className="arrow"
                    onClick={() => {
                        setActive(!active)
                    }}
                >
                    <img
                        className={active ? "active" : undefined}
                        src={arrow}
                        alt=""
                    />
                </div>
                <div className="wrapper">
                    <div className="type">{name}</div>
                    {active ? (
                        <div className="setsReps">
                            <div className="exerciseInfo">
                                <div>{sets} Sets</div>
                                <CloseIcon fontSize="large" />
                                <div>{reps} Reps</div>
                            </div>
                            <div className="setBoxes">
                                {[...Array(parseInt(sets))].map((e, index) => (
                                    <SetBoxes index={index} />
                                ))}
                            </div>
                        </div>
                    ) : (
                        console.log("SELECTED")
                    )}
                </div>
                <div
                    className="arrow"
                    onClick={() => {
                        setActive(!active)
                    }}
                >
                    <img
                        className={active ? "active" : undefined}
                        src={arrow}
                        alt=""
                    />
                </div>
            </div>
        </div>
    )
}
