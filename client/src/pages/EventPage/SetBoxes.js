import {React, useState, useEffect} from "react"
import {useGlobalContext} from "../../store"
import "./SetBoxes.scss"
export default function SetBoxes({
    index,
    setButtonVisible,
    responseSubmit,
    setResponseSubmit,
    numbers,
    handleChange,
    id,
    responses,
}) {
    const {getExerciseResponseById, getExerciseResponseFromExerciseIdQuery} =
        useGlobalContext()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    useEffect(() => {
        ;(async () => {
            await getExerciseResponseFromExerciseIdQuery(id)
        })()
            .catch(setError)
            .finally(() => setLoading(false))
    }, [])

    if (error) {
        return <>{error}</>
    }

    const responseData = getExerciseResponseById(responses)
    if (responseData && !loading) {
        const weightResponses = responseData[0]
        return (
            <div className="setBoxes">
                <div className="responses">
                    <div className="index">Set {index + 1}</div>
                    {weightResponses && !responseSubmit ? (
                        <div
                            className="responseNumbers"
                            onClick={() => {
                                setButtonVisible(true)
                                setResponseSubmit(false)
                            }}
                        >
                            {weightResponses.weights
                                ? weightResponses.weights[index]
                                : numbers[index]}
                        </div>
                    ) : (
                        <input
                            value={
                                weightResponses !== undefined
                                    ? weightResponses.weights[index]
                                    : numbers[index]
                            }
                            type="number"
                            name="set"
                            id={index}
                            placeholder="Enter Weight"
                            onChange={handleChange}
                            required
                        />
                    )}
                </div>
            </div>
        )
    } else {
        return <>Loading</>
    }
}
