function toUserJson(user, isPublic = false) {
  if (isPublic) {
    const {passwordHash, passwordSalt, ...rest} = user
    return rest
  }
  const {passwordHash, passwordSalt, ...rest} = user
  return rest
}

export default toUserJson
