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
    throw new HttpError.NotFound("Events not found.")
  }

  return res.json(userMembershipsInEvent.map(({event}) => toEventJson(event)))
})

// Gets event if associated with user
router.get("/events/:eventId", onlyAuthenticated, async (req, res) => {
  const event = await db.event.findUnique({
    where: {
      id: Number(req.params.eventId),
    },
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
    await db.$transaction(async db => {
      const userMembershipInEvent = await db.userMembershipInEvent.findUnique({
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

      await db.userMembershipInEvent.createMany({
        data: req.body.invitees.map(userId => ({
          eventId,
          userId,
          role: "INVITEE",
        })),
        skipDuplicates: true,
      })
    })

    const event = await db.event.findUnique({
      where: {id: eventId},
      include: eventInclude,
    })

    return res.json(toEventJson(event))
  },
)

router.post(
  "/events/:eventId/invitees/remove",
  onlyAuthenticated,
  async (req, res) => {
    const eventId = Number(req.params.eventId)
    await db.$transaction(async db => {
      const userMembershipInEvent = await db.userMembershipInEvent.findUnique({
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
          userId: {
            in: req.body.invitees,
          },
          eventId,
        },
      })
    })

    const event = await db.event.findUnique({
      where: {id: eventId},
      include: eventInclude,
    })

    return res.json(toEventJson(event))
  },
)

// Modifies event if owned by user
router.put("/events/:eventId", onlyAuthenticated, async (req, res) => {
  const userMembershipInEvent = await db.$transaction(async db => {
    const userMembershipInEvent = await db.userMembershipInEvent.findUnique({
      where: {
        userId_eventId: {
          userId: req.user.id,
          eventId: Number(req.params.eventId),
        },
      },
    })

    if (userMembershipInEvent.role !== "OWNER") {
      throw new HttpError.Forbidden("User not event owner.")
    }

    return db.userMembershipInEvent.update({
      where: {
        userId_eventId: {
          userId: req.user.id,
          eventId: Number(req.params.eventId),
        },
      },
      data: {
        event: {
          update: {
            title: req.body.title,
            description: req.body.description,
            start: req.body.start ? new Date(req.body.start) : undefined,
            finish: req.body.finish ? new Date(req.body.finish) : undefined,
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
    const userMembershipInEvent = await db.userMembershipInEvent.findUnique({
      where: {
        userId_eventId: {
          userId: req.user.id,
          eventId,
        },
      },
    })

    if (userMembershipInEvent.role !== "OWNER") {
      throw new HttpError.Forbidden("User not event owner.")
    }

    await db.userMembershipInEvent.deleteMany({
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
  "/events/:eventId/invite",
  onlyAuthenticated,
  async (req, res) => {
    await db.userMembershipInEvent.delete({
      where: {
        userId_eventId: {
          userId: req.user.id,
          eventId: Number(req.params.eventId),
        },
        role: "INVITEE",
      },
    })

    return res.end()
  },
)
