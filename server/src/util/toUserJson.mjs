function toUserJson(user) {
  delete user.passwordHash
  delete user.passwordSalt

  user.events = user.eventMemberships.map(v => v.eventId)
  delete user.eventMemberships

  user.groups = user.groupMemberships.map(v => v.groupId)
  delete user.groupMemberships

  user.responses = user.exerciseResponses.map(v => v.id)
  delete user.exerciseResponses

  return user
}

export default toUserJson
