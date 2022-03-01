import crypto from "node:crypto"
import db from "../db"
import {HttpError} from "../errors"
import {hashPassword, toUserJson} from "../util"
import {onlyAuthenticated} from "../middleware"
import router from "./router"
import {userInclude} from "../util/includes"

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
        throw new HttpError.Forbidden("Passwords don't match")
    }

    if (!req.body.email.includes("@")) {
        throw new HttpError.Forbidden("Emails must include @")
    }

    if (req.body.username.includes("@")) {
        throw new HttpError.Forbidden("Usernames cannot include @")
    }

    const passwordSalt = crypto.randomBytes(32).toString("base64")
    const passwordHash = await hashPassword(req.body.password, passwordSalt)
    try {
        const user = await db.user.create({
            data: {
                email: req.body.email,
                passwordHash,
                passwordSalt,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                username: req.body.username,
            },
            include: userInclude,
        })

        req.session.userId = user.id

        return res.json(toUserJson(user))
    } catch (e) {
        console.log(e.meta.target)
        if (e.meta.target[0] === "username") {
            console.log("wrong username")
            throw Error("Username already in use")
        } if (e.meta.target[0] === "email") {
            console.log("wong email")
            throw Error("Email already in use")
        }
        throw e
    }
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
    const userByUsername = await db.user.findUnique({
        where: {username: req.body.emailOrUsername},
        include: userInclude,
    })
    const userByEmail = await db.user.findUnique({
        where: {email: req.body.emailOrUsername},
        include: userInclude,
    })

    const user = userByUsername ?? userByEmail

    if (user == null) {
        throw new HttpError.Forbidden("Invalid credentials")
    }

    const passwordHash = await hashPassword(
        req.body.password,
        user.passwordSalt,
    )
    if (passwordHash !== user.passwordHash) {
        throw new HttpError.Forbidden("Invalid credentials")
    }

    req.session.userId = user.id

    return res.json(toUserJson(user))
})

// Gets private user information
router.get("/users/me", onlyAuthenticated, async (req, res) => {
    return res.json(toUserJson(req.user))
})

// Gets public user information
router.get("/users/:userId", async (req, res) => {
    const user = await db.user.findUnique({
        where: {
            id: Number(req.params.userId),
        },
        include: userInclude,
    })

    if (user == null) {
        throw new HttpError.NotFound("User not found.") // NOTE: Errors need to be in normal human syntax
    }

    return res.json(toUserJson(user))
})

// Gets public user information using username
router.get("/users/:username", async (req, res) => {
    const user = await db.user.findUnique({
        where: {
            username: req.params.username,
        },
        include: userInclude,
    })

    if(user == null) {
        throw new HttpError.NotFound("User not found.")
    }

    return res.json(toUserJson(user))
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
        data: newData,
        include: userInclude,
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
