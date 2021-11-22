function toEventJson(event) {
  event.owners = event.userMemberships.reduce((a, v) => {
    if (v.role === "OWNER") {
      a.push(v.userId)
    }
    return a
  }, [])
  event.users = event.userMemberships.reduce((a, v) => {
    if (v.role === "INVITEE") {
      a.push(v.userId)
    }
    return a
  }, [])
  delete event.userMemberships

  event.groups = event.groupMemberships.map(v => v.id)
  delete event.groupMemberships

  event.exercises = event.exercises.map(v => v.id)
  event.responses = event.exerciseResponses.map(v => v.id)
  delete event.exerciseResponses

  return event
}

export default toEventJson
