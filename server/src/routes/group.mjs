import router from "./router"
import db from "../db"
import {onlyAuthenticated} from "../middleware"
import {groupInclude, userMembershipInGroupInclude} from "../util/includes"
import {toGroupJson} from "../util"
import {HttpError} from "../errors"

// Create group
router.post("/group", onlyAuthenticated, async (req, res) => {
  const group = await db.group.create({
    data: {
      tag: req.body.tag,
      userMemberships: {
        create: {
          role: "OWNER",
          userId: req.user.id,
        },
      },
    },
    include: groupInclude,
  })

  return res.json(toGroupJson(group))
})

// Get group
router.get("/groups/:groupId", onlyAuthenticated, async (req, res) => {
  const groupId = Number(req.params.groupId)

  const group = await db.group.findUnique({
    where: {
      id: groupId,
    },
    include: groupInclude,
  })

  if (group == null) {
    throw new HttpError.NotFound("Group not found.")
  }

  return res.json(toGroupJson(group))
})

// // Might not need to exist
// router.get("/groups/findBy" /* ?tag=${tagId} */)

// Modifies group name
router.put("/groups/:groupId", onlyAuthenticated, async (req, res) => {
  const groupId = Number(req.params.groupId)

  const group = await db.$transaction(async db => {
    const userMembershipInGroup = await db.userMembershipInGroup.findUnique({
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

    return db.group.update({
      where: {
        id: groupId,
      },
      data: {
        tag: req.body.tag,
      },
      include: groupInclude,
    })
  })

  return res.json(toGroupJson(group))
})

// Adds group member
router.post("/groups/:groupId/users", onlyAuthenticated, async (req, res) => {
  const groupId = Number(req.params.groupId)

  const group = await db.$transaction(async db => {
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
      data: req.body.userIds.map(userId => ({
        groupId,
        userId,
        role: "INVITEE",
      })),
      skipDuplicates: true,
    })

    return db.group.findUnique({
      where: {id: groupId},
      include: groupInclude,
    })
  })

  return res.json(toGroupJson(group))
})

// Delete group member
router.delete(
  "/groups/:groupId/users/:userId",
  onlyAuthenticated,
  async (req, res) => {
    const groupId = Number(req.params.groupId)
    const userId = Number(req.params.userId)

    await db.$transaction(async db => {
      const userMembershipInGroup = await db.userMembershipInGroup.findUnique({
        where: {
          userId_groupId: {
            userId: req.user.id,
            groupId,
          },
        },
      })

      if (userMembershipInGroup.role !== "OWNER" && userId !== req.user.id) {
        throw new HttpError.Forbidden("User not cannot delete group member.")
      }

      await db.userMembershipInGroup.delete({
        where: {
          userId_groupId: {
            userId,
            groupId,
          },
        },
      })
    })

    return res.end()
  },
)

// Delete group
router.delete("/groups/:groupId", onlyAuthenticated, async (req, res) => {
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

    await db.group.delete({
      where: {
        id: groupId,
      },
    })
  })

  return res.end()
})
