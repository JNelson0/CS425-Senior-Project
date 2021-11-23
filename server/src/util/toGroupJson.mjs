function toGroupJson(group) {
  group.owners = group.userMemberships.reduce((a, v) => {
    if (v.role === "OWNER") {
      a.push(v.userId)
    }
    return a
  }, [])
  group.users = group.userMemberships.reduce((a, v) => {
    if (v.role === "INVITEE") {
      a.push(v.userId)
    }
    return a
  }, [])
  delete group.userMemberships

  return group
}

export default toGroupJson
