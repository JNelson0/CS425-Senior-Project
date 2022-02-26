import React, {useState} from "react"
import "./ExerciseContainer.scss"
import arrow from "../../img/down.png"
export default function ExerciseContainer({type, name, sets, reps, id}) {
    const [active, setActive] = useState(false)

    return (
        <div className={active ? "exercise active" : "exercise"}>
            <button
                className={active ? "button active" : "button"}
                onClick={() => {
                    setActive(!active)
                }}
            >
                <img
                    className={active ? "active" : undefined}
                    src={arrow}
                    alt=""
                />
                <div className="wrapper">
                    <div className="type">{type}</div>
                    {active ? (
                        <div className="exerciseInfo">
                            <div>{name}</div>
                            <div>{sets}</div>
                            <div>{reps}</div>
                        </div>
                    ) : (
                        console.log("SELECTED")
                    )}
                </div>
                <img
                    className={active ? "active" : undefined}
                    src={arrow}
                    alt=""
                />
            </button>
        </div>
    )
}
