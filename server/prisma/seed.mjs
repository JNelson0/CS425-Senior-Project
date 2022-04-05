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
            googleRefreshToken: "1//01meaNwaelS3xCgYIARAAGAESNwF-L9Irhofas3QJuWp9d21BEU1_IjVxdPK8AOFoG06VQ5nm7o6nr-OWiJqumU892esZ-Z5TmQw",
        },
    })

    const user2 = await db.user.create({
        data: {
            email: "email2@email.com",
            passwordSalt: "salt2",
            passwordHash: await hashPassword("password", "salt2"),
            firstName: "Other",
            lastName: "Account",
            username: "andrew",
        },
    })

    const user3 = await db.user.create({
        data: {
            email: "email3@email.com",
            passwordSalt: "salt3",
            passwordHash: await hashPassword("password", "salt3"),
            firstName: "Third",
            lastName: "Account",
            username: "alex",
        },
    })
    const user4 = await db.user.create({
        data: {
            email: "email4@email.com",
            passwordSalt: 'salt4',
            passwordHash: await hashPassword("password", "salt4"),
            firstName: "Fourth",
            lastName: "Account",
            username: "charles",
        }
    })
    const user5 = await db.user.create({
        data: {
            email: "email5@email.com",
            passwordSalt: 'salt5',
            passwordHash: await hashPassword("password", "salt5"),
            firstName: "Fifth",
            lastName: "Account",
            username: "jared",
        }
    })
    const user6 = await db.user.create({
        data: {
            email: "email6@email.com",
            passwordSalt: 'salt6',
            passwordHash: await hashPassword("password", "salt6"),
            firstName: "Sixth",
            lastName: "Account",
            username: "andrewh",
        }
    })
    const user7 = await db.user.create({
        data: {
            email: "email7@email.com",
            passwordSalt: 'salt7',
            passwordHash: await hashPassword("password", "salt7"),
            firstName: "Seventh",
            lastName: "Account",
            username: "vinh",
        }
    })
    const user8 = await db.user.create({
        data: {
            email: "email8@email.com",
            passwordSalt: 'salt8',
            passwordHash: await hashPassword("password", "salt8"),
            firstName: "Eighth",
            lastName: "Account",
            username: "dave",
        }
    })
    const user9 = await db.user.create({
        data: {
            email: "email9@email.com",
            passwordSalt: 'salt9',
            passwordHash: await hashPassword("password", "salt9"),
            firstName: "Ninth",
            lastName: "Account",
            username: "tin",
        }
    })
    const user10 = await db.user.create({
        data: {
            email: "email10@email.com",
            passwordSalt: 'salt10',
            passwordHash: await hashPassword("password", "salt10"),
            firstName: "Tenth",
            lastName: "Account",
            username: "devrin",
        }
    })
    const event3 = await db.event.create({
        data: {
            title: "Team Practice",
            description: "Practice at football field",
            type: "STANDARD",
            start: new Date('March 7, 2022 08:30:00'),
            finish: new Date('March 7, 2022 09:30:00'),
            userMemberships: {
                create: 
                [{
                    role: "OWNER",
                    userId: user.id,
                },
                {
                    role: "INVITEE",
                    userId: user2.id,
                },
                {
                    role: "INVITEE",
                    userId: user3.id,
                },
                {
                    role: "INVITEE",
                    userId: user4.id,
                },
                {
                    role: "INVITEE",
                    userId: user5.id,
                },
                {
                    role: "INVITEE",
                    userId: user6.id,
                },
                {
                    role: "INVITEE",
                    userId: user7.id,
                },
                {
                    role: "INVITEE",
                    userId: user8.id,
                },
                {
                    role: "INVITEE",
                    userId: user9.id,
                },
                {
                    role: "INVITEE",
                    userId: user10.id,
                },
            ]
            },
        },
    })
    const event4 = await db.event.create({
        data: {
            title: "Team Practice",
            description: "Practice at football field",
            type: "STANDARD",
            start: new Date('March 9, 2022 08:30:00'),
            finish: new Date('March 9, 2022 09:30:00'),
            userMemberships: {
                create: 
                [{
                    role: "OWNER",
                    userId: user.id,
                },
                {
                    role: "INVITEE",
                    userId: user2.id,
                },
                {
                    role: "INVITEE",
                    userId: user3.id,
                },
                {
                    role: "INVITEE",
                    userId: user4.id,
                },
                {
                    role: "INVITEE",
                    userId: user5.id,
                },
                {
                    role: "INVITEE",
                    userId: user6.id,
                },
                {
                    role: "INVITEE",
                    userId: user7.id,
                },
                {
                    role: "INVITEE",
                    userId: user8.id,
                },
                {
                    role: "INVITEE",
                    userId: user9.id,
                },
                {
                    role: "INVITEE",
                    userId: user10.id,
                },
            ]
            },
        },
    })

    const event5 = await db.event.create({
        data: {
            title: "Team Practice",
            description: "Practice at football field",
            type: "STANDARD",
            start: new Date('March 11, 2022 08:30:00'),
            finish: new Date('March 11, 2022 09:30:00'),
            userMemberships: {
                create: 
                [{
                    role: "OWNER",
                    userId: user.id,
                },
                {
                    role: "INVITEE",
                    userId: user2.id,
                },
                {
                    role: "INVITEE",
                    userId: user3.id,
                },
                {
                    role: "INVITEE",
                    userId: user4.id,
                },
                {
                    role: "INVITEE",
                    userId: user5.id,
                },
                {
                    role: "INVITEE",
                    userId: user6.id,
                },
                {
                    role: "INVITEE",
                    userId: user7.id,
                },
                {
                    role: "INVITEE",
                    userId: user8.id,
                },
                {
                    role: "INVITEE",
                    userId: user9.id,
                },
                {
                    role: "INVITEE",
                    userId: user10.id,
                },
            ]
            },
        },
    })

    const group1 = await db.group.create({
        data: {
            tag: "Team Roster",
            userMemberships: {
                create: [
                    {
                        role: "OWNER",
                        userId: user.id,
                    },
                    {
                        role: "INVITEE",
                        userId: user2.id,
                    },

                    {
                        role: "INVITEE",
                        userId: user3.id,
                    },
                    {
                        role: "INVITEE",
                        userId: user4.id,
                    },
                    {
                        role: "INVITEE",
                        userId: user5.id,
                    },
                    {
                        role: "INVITEE",
                        userId: user6.id,
                    },
                    {
                        role: "INVITEE",
                        userId: user7.id,
                    },
                    {
                        role: "INVITEE",
                        userId: user8.id,
                    },
                    {
                        role: "INVITEE",
                        userId: user9.id,
                    },
                    {
                        role: "INVITEE",
                        userId: user10.id,
                    },
                ]
           },
 
        },
    })

    const group2 = await db.group.create({
        data: {
            tag: "Weights Group",
            userMemberships: {
                create: 
                [
                    {
                        role: "OWNER",
                        userId: user5.id,
                    },
                    {
                        role: "INVITEE",
                        userId: user2.id,
                    },
                    {
                        role: "INVITEE",
                        userId: user3.id,
                    },
                    {
                        role: "INVITEE",
                        userId: user4.id,
                    },
                    {
                        role: "INVITEE",
                        userId: user.id,
                    },

                    {
                        role: "INVITEE",
                        userId: user6.id,
                    },
                    {
                        role: "INVITEE",
                        userId: user7.id,
                    },
                    {
                        role: "INVITEE",
                        userId: user8.id,
                    },
                    {
                        role: "INVITEE",
                        userId: user9.id,
                    },
                    {
                        role: "INVITEE",
                        userId: user10.id,
                    },
                ]
            },
        },
    })
    
    const event1 = await db.event.create({
        data: {
            title: "Weight Lifting",
            description: "Leg Day",
            type: "WORKOUT",
            start: new Date('March 8, 2022 17:00:00'),
            finish: new Date('March 8, 2022 18:00:00'),
            userMemberships: {
                create: 
                [{
                    role: "OWNER",
                    userId: user5.id,
                },
                {
                    role: "INVITEE",
                    userId: user2.id,
                },
                {
                    role: "INVITEE",
                    userId: user3.id,
                },
                {
                    role: "INVITEE",
                    userId: user4.id,
                },
                {
                    role: "INVITEE",
                    userId: user.id,
                },
                {
                    role: "INVITEE",
                    userId: user6.id,
                },
                {
                    role: "INVITEE",
                    userId: user7.id,
                },
                {
                    role: "INVITEE",
                    userId: user8.id,
                },
                {
                    role: "INVITEE",
                    userId: user9.id,
                },
                {
                    role: "INVITEE",
                    userId: user10.id,
                },
            ]
            },
            groupMemberships: {
                create: 
                [{
                    role: "OWNER",
                    groupId: group2.id,
                }]
            },
            exercises: {
                create: [
                {
                    type: "WEIGHTS",
                    name: "Barbell Squat",
                    content: JSON.stringify({reps: 10, sets: 3}),
                },
                {
                    type: "WEIGHTS",
                    name: "Squat Jumps",
                    content: JSON.stringify({reps: 10, sets: 3}),
                },
                {
                    type: "WEIGHTS",
                    name: "Lunges",
                    content: JSON.stringify({reps: 10, sets: 3}),
                }

                ]
            }
        },
    })

    const event2 = await db.event.create({
        data: {
            title: "Weight Lifting",
            description: "Arm Day",
            type: "WORKOUT",
            start: new Date('March 10, 2022 17:00:00'),
            finish: new Date('March 10, 2022 18:00:00'),
            userMemberships: {
                create: 
                [{
                    role: "OWNER",
                    userId: user5.id,
                },
                {
                    role: "INVITEE",
                    userId: user2.id,
                },
                {
                    role: "INVITEE",
                    userId: user3.id,
                },
                {
                    role: "INVITEE",
                    userId: user4.id,
                },
                {
                    role: "INVITEE",
                    userId: user.id,
                },
                {
                    role: "INVITEE",
                    userId: user6.id,
                },
                {
                    role: "INVITEE",
                    userId: user7.id,
                },
                {
                    role: "INVITEE",
                    userId: user8.id,
                },
                {
                    role: "INVITEE",
                    userId: user9.id,
                },
                {
                    role: "INVITEE",
                    userId: user10.id,
                },
            ]
            },
            groupMemberships: {
                create: 
                [{
                    role: "OWNER",
                    groupId: group2.id,
                }]
            },
            exercises: {
                create: [
                {
                    type: "WEIGHTS",
                    name: "Dumbbell Curls",
                    content: JSON.stringify({reps: 12, sets: 3}),
                },
                {
                    type: "WEIGHTS",
                    name: "Hammer Curls",
                    content: JSON.stringify({reps: 12, sets: 3}),
                },
                {
                    type: "WEIGHTS",
                    name: "Shoulder Press",
                    content: JSON.stringify({reps: 12, sets: 3}),
                }

                ]
            }
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
