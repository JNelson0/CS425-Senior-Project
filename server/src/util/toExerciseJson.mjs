function toExerciseJson(exercise) {
    if (exercise.type !== "WEIGHTS") {
        throw new Error("Fail")
    }

    const {reps, sets} = JSON.parse(exercise.content)
    exercise.reps = reps
    exercise.sets = sets
    delete exercise.content

    exercise.responses = exercise.exerciseResponses.map(v => v.id)
    delete exercise.exerciseResponses

    return exercise
}

export default toExerciseJson
