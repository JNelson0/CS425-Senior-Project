import router from "./router"
import db from "../db"
import {onlyAuthenticated} from "../middleware"
import {groupInclude, userMembershipInGroupInclude} from "../util/includes"
import {toGroupJson} from "../util"

// Create group
router.post("/group", onlyAuthenticated, async (req, res) => {
  const group = await db.group.create({
    data: {
      tag: req.body.tag,
      userMemberships: {
        create: {role: "OWNER", userId: req.user.id},
      },
    },
  })

  return res.json(toGroupJson(group))
})

// Get group
router.get("/groups/:groupId", onlyAuthenticated, async (req, res) => {
  const group = await db.group.findUnique({
    where: {
      id: Number(req.params.id),
    },
    include: groupInclude,
  })

  if (group == null) {
    throw new HttpError.NotFound("Group not found.")
  }

  return res.json(toGroupJson(group))
})

// Might not need to exist
router.get("/groups/findBy" /* ?tag=${tagId} */)

// Modifies group name
router.put("/groups/:groupId", onlyAuthenticated, async (req, res) => {
  const userMembershipInGroup = await db.$transaction(async db => {
    await db.userMembershipInGroup.findUnique({
      where: {
        userId_groupId: {
          userId: req.user.id,
          groupId: Number(req.params.groupId),
        },
      },
    })

    if (userMembershipInGroup.role !== "OWNER") {
      throw new HttpError.Forbidden("User not Group owner.")
    }

    return db.userMembershipInGroup.update({
      where: {
        userId_groupId: {
          userId: req.user.id,
          groupId: Number(req.params.groupId),
        },
      },
      data: {
        tag: req.body.tag,
      },
      include: userMembershipInGroupInclude,
    })
  })
  return res.json(toGroupJson(userMembershipInGroup.group))
})

// Adds group member
router.post("/groups/:groupId/members", onlyAuthenticated, async (req, res) => {
  const groupId = Number(req.params.groupId)
  await db.$transaction(async db => {
    const userMembershipInGroup = await db.userMembershipInGroup.findUnique({
      where: {
        userId_groupId: {
          userId: req.user.id,
          groupId,
        },
      },
    })

    if (userMembershipInGroup.role !== "OWNER") {
      throw new HttpError.Forbidden("User not group owner")
    }

    await db.userMembershipInGroup.createMany({
      data: req.body.invitees.map(userId => ({
        groupId,
        userId,
        role: "INVITEE",
      })),
      skipDuplicates: true,
    })
  })

  const group = await db.group.findUnique({
    where: {id: groupId},
    include: groupInclude,
  })

  return res.json(toGroupJson(group))
})

// Delete group member
router.delete(
  "/groups/:groupId/members/:memberId",
  onlyAuthenticated,
  async (req, res) => {
    const userMembershipInGroup = await db.$transaction(async db => {
      await db.userMembershipInGroup.findUnique({
        where: {
          userId_groupId: {
            userId: Number(req.params.memberId),
            groupId: Number(req.params.groupId),
          },
        },
      })

      if (
        userMembershipInGroup.role !== "OWNER" ||
        Number(req.params.memberId) === req.user.id
      ) {
        throw new HttpError.Forbidden("User not Group owner.")
      }

      await db.userMembershipInGroup.delete({
        where: {
          userId_groupId: {
            userId: req.user.id,
            groupId: Number(req.params.groupId),
          },
        },
      })
    })
    return res.end()
  },
)

// Delete group
router.delete("/groups/:groupId", onlyAuthenticated, async (req, res) => {
  const userMembershipInGroup = await db.$transaction(async db => {
    const groupId = Number(req.params.groupId)

    await db.userMembershipInGroup.findUnique({
      where: {
        userId_groupId: {
          userId: req.user.id,
          groupId,
        },
      },
    })

    if (userMembershipInGroup.role !== "OWNER") {
      throw new HttpError.Forbidden("User not Group owner.")
    }

    await db.userMembershipInGroup.deleteMany({
      where: {
        groupId,
      },
    })

    await db.groupMembershipInEvent.deleteMany({
      where: {
        groupId,
      },
    })

    await db.userMembershipInGroup.delete({
      where: {
        userId_groupId: {
          userId: req.user.id,
          groupId,
        },
      },
    })
  })
  return res.end()
})
