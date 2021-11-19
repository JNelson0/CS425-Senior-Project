import db from "../db"
import {HttpError} from "../errors/index"

async function onlyAuthenticated(req, res, next) {
  if (req.session.userId == null) {
    throw new HttpError.Forbidden("User does not have session.")
  }

  const user = await db.user.findUnique({
    where: {
      id: req.session.userId,
    },
  })

  if (user == null) {
    throw new HttpError.Forbidden("User does not have session.")
  }

  req.user = user

  return next()
}

export default onlyAuthenticated
