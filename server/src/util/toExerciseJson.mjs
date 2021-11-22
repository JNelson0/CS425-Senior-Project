function toExerciseJson(exercise) {
  if (exercise.type !== "WEIGHTS") {
    throw new Error("Fail")
  }

  const {reps, sets} = JSON.parse(exercise.content)
  exercise.reps = reps
  exercise.sets = sets
  delete exercise.content

  return exercise
}

export default toExerciseJson
