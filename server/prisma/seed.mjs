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
            start: new Date(Date.now() - 28800000),
            finish: new Date(Date.now() - 25200000),
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
            start: new Date(Date.now() - 28800000),
            finish: new Date(Date.now() - 25200000),
            start: new Date(Date.now() - 28800000),
            finish: new Date(Date.now() - 25200000),
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
            start: new Date(Date.now() - 28800000),
            finish: new Date(Date.now() - 25200000),
            start: new Date(Date.now() - 28800000),
            finish: new Date(Date.now() - 25200000),
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
            start: new Date(Date.now() - 28800000),
            finish: new Date(Date.now() - 25200000),
            start: new Date(Date.now() - 28800000),
            finish: new Date(Date.now() - 25200000),
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
            start: new Date(Date.now() - 28800000),
            finish: new Date(Date.now() - 25200000),
            start: new Date(Date.now() - 28800000),
            finish: new Date(Date.now() - 25200000),
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
            start: new Date(Date.now() - 28800000),
            finish: new Date(Date.now() - 25200000),
            start: new Date(Date.now() - 28800000),
            finish: new Date(Date.now() - 25200000),
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
            start: new Date(Date.now() - 28800000),
            finish: new Date(Date.now() - 25200000),
            start: new Date(Date.now() - 28800000),
            finish: new Date(Date.now() - 25200000),
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
            start: new Date(Date.now() - 28800000),
            finish: new Date(Date.now() - 25200000),
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
            start: new Date(Date.now() - 28800000),
            finish: new Date(Date.now() - 25200000),
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
            start: new Date(Date.now() - 28800000),
            finish: new Date(Date.now() - 25200000),
            userMemberships: {
                create: {
                    role: "OWNER",
                    userId: user.id,
                },
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
