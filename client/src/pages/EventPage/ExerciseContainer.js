import React, {useState, useEffect} from "react"
import "./ExerciseContainer.scss"
import arrow from "../../img/down.png"
import arrow_white from "../../img/down_white.png"
import SetBoxes from "./SetBoxes"
import CloseIcon from "@mui/icons-material/Close"
import "./SetBoxes.scss"
import {useGlobalContext} from "../../store"
import CheckBox from "@mui/icons-material/CheckBox"

export default function ExerciseContainer({
    type,
    name,
    sets,
    reps,
    id,
    activeId,
    setActiveId,
    darkmode,
}) {
    const [active, setActive] = useState(false)
    const [numbers, setNumbers] = useState(new Array(parseInt(sets)))
    const [responseSubmit, setResponseSubmit] = useState(false)
    const [buttonVisible, setButtonVisible] = useState(true)

    const [popup, setPopup] = useState(false)
    const {createExerciseResponseQuery, getExerciseById} = useGlobalContext()

    useEffect(() => {
        if (activeId === id) {
            setActive(true)
        } else {
            setActive(false)
        }
    }, [activeId])

    const handleChange = e => {
        setNumbers({
            ...numbers,
            [e.target.id]: e.target.value,
        })
    }

    const checkInputs = () => {
        let counter = 0
        for (let i = 0; i < parseInt(sets); i++) {
            numbers[i] === "" || numbers[i] === undefined
                ? (counter -= 1)
                : (counter += 1)
        }
        if (counter === parseInt(sets)) {
            return true
        } else {
            return false
        }
    }

    const [error, setError] = useState()
    useEffect(() => {
        if (responseSubmit) {
            let responseArray = new Array()
            // console.log(numbers)
            for (let i = 0; i < parseInt(sets); i++) {
                numbers[i] = parseInt(numbers[i])
                responseArray.push(numbers[i])
            }
            ;(async () => {
                await createExerciseResponseQuery(id, responseArray)
            })()
                .catch(setError)
                .then(() => {
                    setResponseSubmit(false)
                    setButtonVisible(false)
                })
        }
    }, [responseSubmit])

    const handleSubmit = e => {
        e.preventDefault()
        checkInputs() ? setResponseSubmit(true) : setPopup(true)
        setActiveId()
    }

    if (error) {
        return <>{error}</>
    }
    const exerciseData = getExerciseById(id)

    if (exerciseData !== undefined) {
        return (
            <div className={(active ? "exercise active " : "exercise ") + (darkmode ? "light" : "dark")}>
                {popup ? (
                    <div className={"popup1 " + (darkmode ? "light" : "dark")}>
                        Please enter all exercise information before submitting
                        <button onClick={() => setPopup(false)}>Return</button>
                    </div>
                ) : (
                    <div
                        className={
                            active
                                ? "exerciseComponent active"
                                : "exerciseComponent"
                        }
                    >
                        <div
                            className="arrow"
                            onClick={() => {
                                setActive(!active)
                                setActiveId(id)
                            }}
                            
                        >
                            {darkmode ? 
                                <img
                                    className={active ? "active" : undefined}
                                    src={arrow}
                                    alt=""
                                />
                                :
                                <img
                                    className={active ? "active" : undefined}
                                    src={arrow_white}
                                    alt=""
                                />
                            }
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
                                    <form className="setBoxes" action="submit">
                                        {[...Array(parseInt(sets))].map(
                                            (e, index) => (
                                                <SetBoxes
                                                    index={index}
                                                    setButtonVisible={
                                                        setButtonVisible
                                                    }
                                                    responseSubmit={
                                                        responseSubmit
                                                    }
                                                    setResponseSubmit={
                                                        setResponseSubmit
                                                    }
                                                    numbers={numbers}
                                                    handleChange={handleChange}
                                                    id={exerciseData.id}
                                                    responses={
                                                        exerciseData.exerciseResponses
                                                    }
                                                />
                                            ),
                                        )}
                                        <div className="checkMarkBox">
                                            <CheckBox 
                                                className={
                                                    (buttonVisible ? "check " : "check active ") + (darkmode ? "light" : "dark")
                                                }
                                                type="submit"
                                                onClick={handleSubmit}
                                                sx={{fontSize: 35}} 
                                            />
                                        </div>
                                    </form>
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                        <div
                            className="arrow"
                            onClick={() => {
                                setActive(!active)
                                setActiveId(id)
                            }}
                        >
                            {darkmode ? 
                                <img
                                    className={active ? "active" : undefined}
                                    src={arrow}
                                    alt=""
                                />
                                :
                                <img
                                    className={active ? "active" : undefined}
                                    src={arrow_white}
                                    alt=""
                                />
                            }
                        </div>
                    </div>
                )}
            </div>
        )
    } else {
        return <>Loading</>
    }
}
