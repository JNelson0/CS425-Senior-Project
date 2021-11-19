import express from "express"
import crypto from "node:crypto"
import db from "../db"
import {HttpError} from "../errors/index"
import {hashPassword, toUserJson} from "../util"
import {onlyAuthenticated} from "../middleware"
import {start} from "node:repl"

const router = express()

router.get("/", onlyAuthenticated, async (req, res) => {
  return res.json(req.user)
})

const request = {
  email: "email@email.com",
  password: "password",
  passwordConfirmation: "password",
  firstName: "",
  lastName: "",
  username: "",
}

/* 
// Creates user

interface PostUserRequestBody {
  email: string
  password: string
  passwordConfirmation: string
  firstName: string
  lastName: string
  username: string
}

type PostUserResponse = Omit<User, "passwordHash" | "passwordSalt">
*/
router.post("/user", async (req, res) => {
  if (req.body.password !== req.body.passwordConfirmation) {
    throw new HttpError.Forbidden("Passwords don't match.")
  }

  const passwordSalt = crypto.randomBytes(32).toString("base64")
  const passwordHash = await hashPassword(req.body.password, passwordSalt)

  const user = await db.user.create({
    data: {
      email: req.body.email,
      passwordHash,
      passwordSalt,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
    },
  })

  req.session.userId = user.id

  return res.json(toUserJson(user))
})

// Logs in user
/* Easy to change from username-password
// Creates user

interface PostUserLoginRequestBody {
  password: string
  emailOrUsername: string
}

type PostUserResponse = Omit<User, "passwordHash" | "passwordSalt">
*/
router.post("/user/login", async (req, res) => {
  const user = await db.user.findUnique({
    where: {
      OR: [
        {
          username: req.body.emailOrUsername,
        },
        {
          email: req.body.emailOrUsername,
        },
      ],
    },
  })

  if (user == null) {
    throw new HttpError.Forbidden("Invalid credentials")
  }

  const passwordHash = await hashPassword(req.body.password, user.passwordSalt)
  if (passwordHash !== user.passwordHash) {
    throw new HttpError.Forbidden("Invalid credentials")
  }

  req.session.userId = user.id

  return res.json(toUserJson(user))
})

// Gets public user information
router.get("/users/:userId", async (req, res) => {
  const user = await db.user.findUnique({
    where: {
      id: Number(req.session.userId),
    },
  })

  if (user == null) {
    throw new HttpError.NotFound("User not found.") // NOTE: Errors need to be in normal human syntax
  }

  return res.json(toUserJson(user, true))
})

// Gets private user information
router.get("/users/me", onlyAuthenticated, async (req, res) => {
  return res.json(toUserJson(req.user))
})

// Modifies private user information
/* 
// 

interface PutUserRequestBody {
  firstName?: string
  lastName?: string
  username?: string
}

type PostUserResponse = Omit<User, "passwordHash" | "passwordSalt">
*/
router.put("/users/me", onlyAuthenticated, async (req, res) => {
  const newData = {}

  if (req.body.firstName) {
    newData.firstName = req.body.firstName
  }
  if (req.body.lastName) {
    newData.lastName = req.body.lastName
  }
  if (req.body.username) {
    newData.username = req.body.username
  }

  const user = await db.user.update({
    where: {
      id: req.user.id,
    },
    data: {firstName: req.body.firstName, lastName: req.body.lastName},
  })

  res.json(toUserJson(user))
})

// Deletes private user information
// Requires Authentication
router.delete("/users/me", onlyAuthenticated, async (req, res) => {
  await db.user.delete({
    where: {
      id: Number(req.user.id),
    },
  })

  return res.end()
})

// Creates event
/* 
//

interface PostUserRequestBody {
  title: string
  description: string
  type: "WORKOUT" | "STANDARD"
  start?: number
  finish: number
}

interface PostUserResponse extends PostUserRequestBody {
  owners: number[]
  invitees: number[]
}
*/
// Not not sure how type,start should be implemented, and errors
router.post("/event", onlyAuthenticated, async (req, res) => {
  console.log(req.body)
  const event = await db.event.create({
    data: {
      title: req.body.title,
      description: req.body.description,
      type: req.body.type,
      start: new Date(req.body.start),
      finish: new Date(req.body.finish),
      users: {
        create: {
          role: "OWNER",
          userId: req.user.id,
        },
      },
    },
    select: {
      title: true,
      description: true,
      type: true,
      start: true,
      finish: true,
      users: {
        select: {
          userId: true,
          role: true,
        },
      },
    },
  })

  event.owners = event.users.reduce((a, v) => {
    if (v.role === "OWNER") {
      a.push(v.userId)
    }
    return a
  }, [])
  event.invitees = event.users.reduce((a, v) => {
    if (v.role === "INVITEE") {
      a.push(v.userId)
    }
    return a
  }, [])
  delete event.users

  // TODO: Return public stuff
  return res.json(event)
})

// Lists events if associated with user
router.get("/events", onlyAuthenticated, async (req, res) => {
  return res.json()
})

// Gets event if associated with user
router.get("/events/:eventId", onlyAuthenticated, async (req, res) => {})

// Adds/Removes invitees from event if owned by user
router.post(
  "/events/:eventId/invite",
  onlyAuthenticated,
  async (req, res) => {},
)

// Modifies event if owned by user
router.put("/events/:eventId", onlyAuthenticated, async (req, res) => {})

// Removes event if owned by user
router.delete("/events/:eventId", onlyAuthenticated, async (req, res) => {})

export default router
