import router from "./router"
import db from "../db"
import {HttpError} from "../errors"
import {onlyAuthenticated} from "../middleware"
import {toEventJson} from "../util"
import {eventInclude, userMembershipInEventInclude} from "../util/includes"

// Creates event
/* 
  interface Exercise {
    type: "WEIGHTS",
    
    name: string
    reps: number
    sets: number
  }
  
  interface PostUserRequestBody {
    title: string
    description: string
    type: "WORKOUT" | "STANDARD"
    start?: number
    finish: number
    exercises?: Exercise[]
  }
  
  interface PostUserResponse extends PostUserRequestBody {
    owners: number[]
    invitees: number[]
  }
  */
// Not not sure how type,start should be implemented, and errors
function bodyToExerciseContent(body) {
    if (body.type !== "WEIGHTS") {
        throw new Error()
    }

    const {reps, sets} = body
    // TODO: Validation

    return JSON.stringify({reps, sets})
}

router.post("/event", onlyAuthenticated, async (req, res) => {
    const event = await db.event.create({
        data: {
            title: req.body.title,
            description: req.body.description,
            type: req.body.type,
            start: new Date(req.body.start),
            finish: new Date(req.body.finish),
            userMemberships: {
                create: {
                    role: "OWNER",
                    userId: req.user.id,
                },
            },
        },
        include: eventInclude,
    })

    return res.json(toEventJson(event))
})

// Lists events if associated with user
router.get("/events", onlyAuthenticated, async (req, res) => {
    const userMembershipsInEvent = await db.userMembershipInEvent.findMany({
        where: {
            userId: req.user.id,
        },
        include: userMembershipInEventInclude,
    })

    if (userMembershipsInEvent.length === 0) {
        return res.json([])
    }

    return res.json(userMembershipsInEvent.map(({event}) => toEventJson(event)))
})

// Gets event if associated with user
router.get("/events/:eventId", onlyAuthenticated, async (req, res) => {
    const eventId = Number(req.params.eventId)

    const event = await db.event.findUnique({
        where: {id: eventId},
        include: eventInclude,
    })

    if (event == null) {
        throw new HttpError.NotFound("Event not found.")
    }

    return res.json(toEventJson(event))
})

// Adds/Removes invitees from event if owned by user
router.post(
    "/events/:eventId/invitees",
    onlyAuthenticated,
    async (req, res) => {
        const eventId = Number(req.params.eventId)

        const event = await db.$transaction(async db => {
            const userMembershipInEvent =
                await db.userMembershipInEvent.findUnique({
                    where: {
                        userId_eventId: {
                            userId: req.user.id,
                            eventId,
                        },
                    },
                })

            if (userMembershipInEvent.role !== "OWNER") {
                throw new HttpError.Forbidden("User not event owner")
            }

            // email@email.com
            // @username
            // #group

            // Users

            const emails = req.body.invitees.filter(
                invitee => invitee.includes("@") && !invitee.startsWith("@"),
            )
            const emailObjects = await db.user.findMany({
                where: {
                    email: {in: emails},
                },
            })

            const usernames = req.body.invitees.filter(invitee =>
                invitee.startsWith("@"),
            )
            const usernameObjects = await db.user.findMany({
                where: {
                    username: {
                        in: usernames.map(username => username.substring(1)),
                    },
                },
            })

            const userIdSet = new Set()

            for (const emailObject of emailObjects) {
                userIdSet.add(emailObject.id)
            }

            for (const usernameObject of usernameObjects) {
                userIdSet.add(usernameObject.id)
            }

            await db.userMembershipInEvent.createMany({
                data: [...userIdSet.keys()].map(userId => ({
                    eventId,
                    userId,
                    role: "INVITEE",
                })),
                skipDuplicates: true,
            })

            // Groups

            const groups = req.body.invitees.filter(invitee =>
                invitee.startsWith("#"),
            )

            const groupObjects = await db.group.findMany({
                where: {
                    tag: {in: groups.map(group => group.substring(1))},
                },
                include: {
                    userMemberships: true,
                },
            })

            const groupIdSet = new Set()

            for (const groupObject of groupObjects) {
                groupIdSet.add(groupObject.id)
            }

            await db.groupMembershipInEvent.createMany({
                data: [...groupIdSet.keys()].map(groupId => ({
                    eventId,
                    groupId,
                    role: "INVITEE",
                })),
                skipDuplicates: true,
            })

            return db.event.findUnique({
                where: {id: eventId},
                include: eventInclude,
            })
        })
        console.log(event)
        return res.json(toEventJson(event))
    },
)

router.post(
    "/events/:eventId/invitees/remove",
    onlyAuthenticated,
    async (req, res) => {
        const eventId = Number(req.params.eventId)

        const event = await db.$transaction(async db => {
            const userMembershipInEvent =
                await db.userMembershipInEvent.findUnique({
                    where: {
                        userId_eventId: {
                            userId: req.user.id,
                            eventId,
                        },
                    },
                })

            if (userMembershipInEvent.role !== "OWNER") {
                throw new HttpError.Forbidden("User not event owner")
            }

            await db.userMembershipInEvent.deleteMany({
                where: {
                    userId: {in: req.body.userIds},
                    eventId,
                },
            })

            await db.groupMembershipInEvent.deleteMany({
                where: {
                    groupId: {in: req.body.groupIds},
                    eventId,
                },
            })

            return db.event.findUnique({
                where: {id: eventId},
                include: eventInclude,
            })
        })

        return res.json(toEventJson(event))
    },
)

// Modifies event if owned by user
router.put("/events/:eventId", onlyAuthenticated, async (req, res) => {
    const eventId = Number(req.params.eventId)

    const userMembershipInEvent = await db.$transaction(async db => {
        const userMembershipInEvent = await db.userMembershipInEvent.findUnique(
            {
                where: {
                    userId_eventId: {
                        userId: req.user.id,
                        eventId,
                    },
                },
            },
        )

        if (userMembershipInEvent.role !== "OWNER") {
            throw new HttpError.Forbidden("User not event owner.")
        }

        return db.userMembershipInEvent.update({
            where: {
                userId_eventId: {
                    userId: req.user.id,
                    eventId,
                },
            },
            data: {
                event: {
                    update: {
                        title: req.body.title,
                        description: req.body.description,
                        start: req.body.start
                            ? new Date(req.body.start)
                            : undefined,
                        finish: req.body.finish
                            ? new Date(req.body.finish)
                            : undefined,
                    },
                },
            },
            include: userMembershipInEventInclude,
        })
    })

    return res.json(toEventJson(userMembershipInEvent.event))
})

// Removes event if owned by user
router.delete("/events/:eventId", onlyAuthenticated, async (req, res) => {
    const eventId = Number(req.params.eventId)

    await db.$transaction(async db => {
        const userMembershipInEvent = await db.userMembershipInEvent.findUnique(
            {
                where: {
                    userId_eventId: {
                        userId: req.user.id,
                        eventId,
                    },
                },
            },
        )

        if (userMembershipInEvent.role !== "OWNER") {
            throw new HttpError.Forbidden("User not event owner.")
        }

        await db.userMembershipInEvent.deleteMany({
            where: {
                eventId,
            },
        })

        await db.groupMembershipInEvent.deleteMany({
            where: {
                eventId,
            },
        })

        await db.exerciseResponse.deleteMany({
            where: {
                eventId,
            },
        })

        await db.exercise.deleteMany({
            where: {
                eventId,
            },
        })

        await db.event.delete({
            where: {
                id: eventId,
            },
        })
    })

    return res.end()
})

// Removes you from event
router.delete(
    "/events/:eventId/invitee",
    onlyAuthenticated,
    async (req, res) => {
        const eventId = Number(req.params.eventId)

        await db.userMembershipInEvent.delete({
            where: {
                userId_eventId: {
                    userId: req.user.id,
                    eventId,
                },
                role: "INVITEE",
            },
        })

        return res.end()
    },
)
