import {Router} from "express"
import crypto from "node:crypto"
import {features} from "node:process"
import db from "../db"
import {HttpError} from "../errors/index"
import {hashPassword} from "../util"

const router = Router()

router.get("/", async (req, res) => {
  return res.send("hello world!")
})

const request = {
  email: "email@email.com",
  password: "password",
  passwordConfirmation: "password",
  firstName: "",
  lastName: "",
  username: "",
}

// Creates user
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

  // TODO: Return public stuff
  return res.json(user)
})

// Gets public user information
router.get("/users/:userId", async (req, res) => {
  //
  const user = await db.user.findUnique({
    where: {
      id: Number(req.params.userId),
    },
  })
  // Errors need to be in normal human syntax
  if (user == null) {
    throw new HttpError.NotFound("User not found.")
  }

  console.log("user:", user)

  return res.json(user)
})

// Gets private user information
router.get("/users/me")

// Modifies private user information
router.put("/users/me")

// Deletes private user information
router.delete("users/me")

// Creates event
router.post("/event")

// Lists events if associated with user
router.get("/events")

// Gets event if associated with user
router.get("/events/:eventId")

// Adds/Removes invitees from event if owned by user
router.post("/events/:eventId/invite")

// Modifies event if owned by user
router.put("/events/:eventId")

// Removes event if owned by user
router.delete("/events/:eventId")

export default router
