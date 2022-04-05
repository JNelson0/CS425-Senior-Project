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
    const [loading, setLoading] = useState(true)
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

    if (responseData !== undefined) {
        const weightResponses = responseData[0]
        weightResponses ? setButtonVisible(false) : setButtonVisible(true)
        return (
            <div className="setBoxes">
                <div className="responses">
                    <div className="index">Set {index + 1}</div>
                    {weightResponses && !responseSubmit ? (
                        <div className="responseNumbers">
                            {weightResponses.weights ? (
                                weightResponses.weights[index]
                            ) : (
                                <></>
                            )}
                        </div>
                    ) : (
                        <input
                            value={
                                weightResponses !== undefined
                                    ? weightResponses.weights[index]
                                    : numbers[index]
                            }
                            type="number"
                            min="1"
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
