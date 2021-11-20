function toEventJson(event) {
  event.owners = event.userMemberships.reduce((a, v) => {
    if (v.role === "OWNER") {
      a.push(v.userId)
    }
    return a
  }, [])
  event.invitees = event.userMemberships.reduce((a, v) => {
    if (v.role === "INVITEE") {
      a.push(v.userId)
    }
    return a
  }, [])
  delete event.userMemberships

  return event
}

export default toEventJson
