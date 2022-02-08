import db from "../src/db"
import {hashPassword} from "../src/util"

async function main() {
  const existingUser = await db.user.findUnique({
    where: {
      email: "email@email.com",
    },
  })

  if (existingUser) {
    return
  }

  const user = await db.user.create({
    data: {
      email: "email@email.com",
      passwordSalt: "salt",
      passwordHash: await hashPassword("password", "salt"),
      firstName: "Test",
      lastName: "Account",
      username: "username",
    },
  })

  await db.event.create({
    data: {
      title: "Run",
      description: "Event description",
      type: "STANDARD",
      start: new Date(Date.now() + 30 * 60000),
      finish: new Date(Date.now() + 30 * 60000),
      userMemberships: {
        create: {
          role: "OWNER",
          userId: user.id,
        },
      },
    },
  })
  await db.event.create({
    data: {
      title: "Weights",
      description: "Event description",
      type: "STANDARD",
      start: new Date(Date.now() + 30 * 60000),
      finish: new Date(Date.now() + 30 * 60000),
      userMemberships: {
        create: {
          role: "OWNER",
          userId: user.id,
        },
      },
    },
  })
  await db.event.create({
    data: {
      title: "Run",
      description: "Event description",
      type: "STANDARD",
      start: new Date(Date.now() + 30 * 60000),
      finish: new Date(Date.now() + 30 * 60000),
      userMemberships: {
        create: {
          role: "OWNER",
          userId: user.id,
        },
      },
    },
  })
  await db.event.create({
    data: {
      title: "Weights",
      description: "Event description",
      type: "STANDARD",
      start: new Date(Date.now() + 30 * 60000),
      finish: new Date(Date.now() + 30 * 60000),
      userMemberships: {
        create: {
          role: "OWNER",
          userId: user.id,
        },
      },
    },
  })
  await db.event.create({
    data: {
      title: "Run",
      description: "Event description",
      type: "STANDARD",
      start: new Date(Date.now() + 30 * 60000),
      finish: new Date(Date.now() + 30 * 60000),
      userMemberships: {
        create: {
          role: "OWNER",
          userId: user.id,
        },
      },
    },
  })
  await db.event.create({
    data: {
      title: "Weights",
      description: "Event description",
      type: "STANDARD",
      start: new Date(Date.now() + 30 * 60000),
      finish: new Date(Date.now() + 30 * 60000),
      userMemberships: {
        create: {
          role: "OWNER",
          userId: user.id,
        },
      },
    },
  })
  await db.event.create({
    data: {
      title: "Run",
      description: "Event description",
      type: "STANDARD",
      start: new Date(Date.now() + 30 * 60000),
      finish: new Date(Date.now() + 30 * 60000),
      userMemberships: {
        create: {
          role: "OWNER",
          userId: user.id,
        },
      },
    },
  })
  await db.event.create({
    data: {
      title: "Weights",
      description: "Event description",
      type: "STANDARD",
      start: new Date(Date.now() + 30 * 60000),
      finish: new Date(Date.now() + 30 * 60000),
      userMemberships: {
        create: {
          role: "OWNER",
          userId: user.id,
        },
      },
    },
  })
  await db.event.create({
    data: {
      title: "Run",
      description: "Event description",
      type: "STANDARD",
      start: new Date(Date.now() + 30 * 60000),
      finish: new Date(Date.now() + 30 * 60000),
      userMemberships: {
        create: {
          role: "OWNER",
          userId: user.id,
        },
      },
    },
  })
  await db.event.create({
    data: {
      title: "Weights",
      description: "Event description",
      type: "STANDARD",
      start: new Date(Date.now() + 30 * 60000),
      finish: new Date(Date.now() + 30 * 60000),
      userMemberships: {
        create: {
          role: "OWNER",
          userId: user.id,
        },
      },
    },
  })

  console.log(user.id)
  await db.event.create({
    data: {
      title: "Workout Test Event",
      description: "Workout Test Event description",
      type: "WORKOUT",
      start: new Date(Date.now() + 30 * 60000),
      finish: new Date(Date.now() + 30 * 60000),
      userMemberships: {
        create: {
          role: "OWNER",
          userId: user.id,
        },
      },
      exercises: {
        create: [
          {
            type: "WEIGHTS",
            name: "SQUAT TEST",
            content: JSON.stringify({reps: 5, sets: 5}),
          },
          {
            type: "WEIGHTS",
            name: "BENCH TEST",
            content: JSON.stringify({reps: 3, sets: 10}),
          },
        ],
      },
    },
  })
}

main()
  .then(() => {
    process.exit()
  })
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
