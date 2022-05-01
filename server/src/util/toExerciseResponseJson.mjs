function toExerciseResponseJson(exerciseResponse) {
    const content = JSON.parse(exerciseResponse.content)
    delete exerciseResponse.content

    const user = exerciseResponse.userId
    delete exerciseResponse.userId

    return {id: exerciseResponse.id, ...content, user}
}

export default toExerciseResponseJson
