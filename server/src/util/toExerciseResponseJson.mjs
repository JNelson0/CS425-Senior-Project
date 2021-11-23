function toExerciseResponseJson(exerciseResponse) {
  const content = JSON.parse(exerciseResponse.content)
  delete exerciseResponse.content
  return {id: exerciseResponse.id, ...content}
}

export default toExerciseResponseJson
