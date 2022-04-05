import {randomBytes} from "crypto"
import {create} from "domain"
import {send} from "process"
import db from "../db.mjs"

describe("POST /user", () => {
    it("should create a user", async () => {
        const response = await agent
            .post("/user")
            .send({
                email: randomBytes(10).toString("base64") + "@email.com",
                password: "password",
                passwordConfirmation: "password",
                firstName: "Charles",
                lastName: "Pezeshki",
                username: "condog" + randomBytes(10).toString("base64"),
            })
            .set("Content-Type", "application/json")
            .expect(200)

        console.log(response.body)
    })
})

describe("POST /user/login", () => {
    it("should login to seed user", async () => {
        const response = await agent
            .post("/user/login")
            .send({
                emailOrUsername: "username",
                password: "password",
            })
            .set("Content-Type", "application/json")
            .expect(200)

        console.log(response.body)
    })
})

describe("GET /users/:userId", () => {
    it("should get a user", async () => {
        const userId = 1

        const response = await agent.get(`/users/${userId}`).expect(200)

        console.log(response.body)
    })
})

describe.only("GET /users/user/:username", () => {
    it("should get a user", async () => {
        let user
        user = await createUser()

        const response = await agent
            .get(`/users/user/${user.username}`)
            .expect(200)

        console.log(response.body)
    })
})

async function createUser() {
    const response = await agent
        .post("/user")
        .send({
            email: randomBytes(10).toString("base64") + "@email.com",
            password: "password",
            passwordConfirmation: "password",
            firstName: "Namey",
            lastName: "Name",
            username: "username." + randomBytes(10).toString("base64"),
        })
        .set("Content-Type", "application/json")
        .expect(200)

    return response.body
}

describe("GET /users/me", () => {
    it("should get a user", async () => {
        const userId = 1

        let response
        response = await createUser()

        // Testing this function
        response = await agent.get("/users/me").expect(200)

        console.log(response.body)
    })
})

describe("PUT /users/me/update", () => {
    it("should modify a user", async () => {
        let response = await createUser()

        // Testing this function
        response = await agent
            .put("/users/me")
            .send({firstName: "Chuck", lastName: "Papa"})
            .set("Content-Type", "application/json")
            .expect(200)

        console.log(response.body)
    })
})

describe("DELETE /users/me", () => {
    it("should delete a user", async () => {
        await createUser()
        // Testing this function
        let response = await agent
            .delete("/users/me")
            .set("Content-Type", "application/json")
            .expect(200)

        console.log(response.body)
    })
})

describe("POST /event", () => {
    it("should create event", async () => {
        await createUser()
        // Testing this function
        let response = await agent
            .post("/event")
            .send({
                title: "Workout 1",
                description: "This is Workout 1",
                type: "STANDARD",
                start: Date.now(),
                finish: Date.now() + 30 * 60000,
            })
            .set("Content-Type", "application/json")
            .expect(200)

        console.dir(response.body, {depth: Infinity})
    })
})

describe("GET /events", () => {
    it("should list events", async () => {
        await createUser()
        await createEvent()
        await createEvent()
        // Testing this function
        let response = await agent
            .get("/events")
            .set("Content-Type", "application/json")
            .expect(200)

        console.dir(response.body, {depth: Infinity})
    })
})

async function createEvent() {
    const event = await agent
        .post("/event")
        .send({
            title: "Workout 1",
            description: "This is Workout 1",
            type: "STANDARD",
            start: Date.now(),
            finish: Date.now() + 30 * 60000,
        })
        .set("Content-Type", "application/json")
        .expect(200)

    return event.body
}

describe("PUT /events/:eventId", () => {
    it("should modify an event", async () => {
        await createUser()
        const event = await createEvent()

        console.log("POST /event response:")
        console.log(event)

        // Testing this function
        let response = await agent
            .put(`/events/${event.id}`)
            .send({
                title: "Workout Updated",
                description: "This Workout Updated",
            })
            .set("Content-Type", "application/json")
            .expect(200)
        console.log("PUT EVENT")
        console.dir(response.body, {depth: Infinity})
    })
})

describe("DELETE /events/:eventId", () => {
    it("should delete an event", async () => {
        await createUser()
        const event = await createEvent()

        console.log("POST /event response: ")
        console.log(event)

        // Testing this function
        let response = await agent
            .delete(`/events/${event.id}`)
            .set("Content-Type", "application/json")
            .expect(200)
        console.log("PUT EVENT")
        console.dir(response.body, {depth: Infinity})
    })
})

describe("DELETE /events/:eventId/invitee", () => {
    it("should delete an event from user", async () => {
        await createUser()
        await createUser()
        const event = await createEvent()

        // console.log("POST /event response: ")
        console.log(event)

        // Testing this function
        let response = await agent
            .delete(`/events/${event.id}`)
            .set("Content-Type", "application/json")
            .expect(200)

        const after = await db.event.findUnique({
            where: {id: event.id},
        })

        if (after) {
            console.log("Failed to delete event", after)
        }
        // console.log("PUT EVENT")
        console.dir(response.body, {depth: Infinity})
    })
})

describe("POST /events/:eventId/invitees", () => {
    it("should invite user to event", async () => {
        const user2 = await createUser()
        const user1 = await createUser()
        const event = await createEvent()
        console.log(event)
        // Testing this function
        let response = await agent
            .post(`/events/${event.id}/invitees`)
            .send({
                invitees: ["@" + user2.username],
            })
            .set("Content-Type", "application/json")
            .expect(200)

        console.dir(response.body, {depth: Infinity})
    })
})

describe("POST /events/:eventId/invitees/remove", () => {
    it("should invite user to event", async () => {
        const user2 = await createUser()
        const user1 = await createUser()
        const event = await createEvent()
        console.log("POSTING: ", event)
        let response = await agent
            .post(`/events/${event.id}/invitees`)
            .send({
                invitees: ["@" + user2.username],
            })
            .set("Content-Type", "application/json")
            .expect(200)

        console.log("Before:")
        console.dir(response.body, {depth: Infinity})

        // Testing this function
        response = await agent
            .post(`/events/${event.id}/invitees/remove`)
            .send({
                userIds: [user2.id],
            })
            .set("Content-Type", "application/json")
            .expect(200)

        console.dir(response.body, {depth: Infinity})
    })
})

describe("POST /group", () => {
    it("should create group", async () => {
        await createUser()

        let response = await agent
            .post("/group")
            .send({
                tag: "Group 80" + randomBytes(10).toString("base64"),
            })
            .set("Content-Type", "application/json")
            .expect(200)

        console.log(response.body)
    })
})

async function createGroup() {
    const group = await agent
        .post("/group")
        .send({
            tag: "Group 77" + randomBytes(10).toString("base64"),
        })
        .set("Content-Type", "application/json")
        .expect(200)

    return group.body
}

describe.only("GET /groups/:groupId", () => {
    it("should get a group", async () => {
        const user2 = await createUser()
        const user = await createUser()
        const group = await createGroup()
        const event = await createEvent()
        const event1 = await createEvent()

        await agent
            .post(`/events/${event.id}/invitees`)
            .send({
                invitees: ["@" + user2.username, "#" + group.tag],
            })
            .set("Content-Type", "application/json")
            .expect(200)

        await agent
            .post(`/events/${event1.id}/invitees`)
            .send({
                invitees: ["@" + user2.username, "#" + group.tag],
            })
            .set("Content-Type", "application/json")
            .expect(200)

        const response = await agent.get(`/groups/${group.id}`).expect(200)

        console.log(response.body)
    })
})

describe("PUT /groups/:groupId", () => {
    it("should modify a group", async () => {
        const user = await createUser()
        const group = await createGroup()

        console.log(user)
        console.log(group)
        // Testing this function
        let response = await agent
            .put(`/groups/${group.id}`)
            .send({
                tag: "New Tag" + randomBytes(10).toString("base64"),
            })
            .set("Content-Type", "application/json")
            .expect(200)
        console.dir(response.body, {depth: Infinity})
    })
})

describe("POST /groups/:groupId/users", () => {
    it("should invite user to event", async () => {
        const user2 = await createUser()
        const user1 = await createUser()
        const group = await createGroup()
        console.log(group)
        // Testing this function
        let response = await agent
            .post(`/groups/${group.id}/users`)
            .send({
                userIds: [user2.id],
            })
            .set("Content-Type", "application/json")
            .expect(200)

        console.dir(response.body, {depth: Infinity})
    })
})

describe("DELETE /groups/:groupId/users/:userId", () => {
    it("should invite user to event", async () => {
        const user2 = await createUser()
        const user1 = await createUser()
        const group = await createGroup()
        console.log("user2", user2)
        console.log("group", group)
        let response = await agent
            .post(`/groups/${group.id}/users`)
            .send({
                userIds: [user2.id],
            })
            .set("Content-Type", "application/json")
            .expect(200)

        console.log("response.body", response.body)
        // Testing this function

        response = await agent
            .delete(`/groups/${group.id}/users/${user2.id}`)
            .set("Content-Type", "application/json")
            .expect(200)

        console.log("Response!")
        console.dir(response.body, {depth: Infinity})
    })
})

describe("DELETE /groups/:groupId", () => {
    it("should delete an event", async () => {
        const user = await createUser()
        const group = await createGroup()

        console.log("POST /group response: ")
        console.log(group)

        // Testing this function
        let response = await agent
            .delete(`/groups/${group.id}`)
            .set("Content-Type", "application/json")
            .expect(200)
        console.log("PUT EVENT")
        console.dir(response.body, {depth: Infinity})
    })
})

async function createExercise(event) {
    const response = await agent
        .post(`/events/${event.id}/exercise`)
        .send({
            type: "WEIGHTS",
            name: "Bench",
            reps: 8,
            sets: 5,
        })
        .set("Content-Type", "application/json")
        .expect(200)

    return response.body
}

async function createResponse(exercise) {
    const response = await agent
        .post(`/exercise/${exercise.id}/response`)
        .send({
            weights: [1, 2, 3, 4, 5],
        })
        .set("Content-Type", "application/json")
        .expect(200)

    return response.body
}

describe("GET /events/:eventId/exercises", () => {
    it("User lists exercises", async () => {
        const user = await createUser()
        const event = await createEvent()
        const exercise = await createExercise(event)
        let response = await agent
            .get(`/events/${event.id}/exercises`)
            .expect(200)
        console.log(response.body)
    })
})

describe("POST /events/:eventId/exercise", () => {
    it("adds exercise to existing event", async () => {
        const user = await createUser()
        const event = await createEvent()
        let response = await createExercise(event)
        console.log(response.body)
    })
})

describe("GET /exercise/:exerciseId", () => {
    it("Get exercise", async () => {
        const user = await createUser()
        const event = await createEvent()
        const exercise = await createExercise(event)
        let response = await agent.get(`/exercise/${exercise.id}`).expect(200)
        console.log(response.body)
    })
})

describe("DELETE /exercise/:exerciseId", () => {
    it("deletes existing exercise", async () => {
        const user = await createUser()
        const event = await createEvent()
        const exercise = await createExercise(event)
        let response = await agent
            .delete(`/exercise/${exercise.id}`)
            .expect(200)
        // await agent.get(`/exercise/${exercise.id}`).expect(404)
    })
})

describe("POST /exercise/:exerciseId/response", () => {
    it("User responds to exercise", async () => {
        const user = await createUser()
        const event = await createEvent()
        const exercise = await createExercise(event)
        const exerciseResponse = await createResponse(exercise)

        console.log(exerciseResponse)
    })
})

describe("PUT /responses/:responseId", () => {
    it("User updates response to exercise", async () => {
        const user = await createUser()
        const event = await createEvent()
        const exercise = await createExercise(event)
        const exerciseResponse = await createResponse(exercise)

        let response = await agent
            .put(`/responses/${exerciseResponse.id}`)
            .send({
                weights: [5, 4, 3, 2, 1],
            })
            .set("Content-Type", "application/json")
            .expect(200)

        console.log(response.body)
    })
})

describe("DELETE /responses/:responseId", () => {
    it("User delete response to exercise", async () => {
        const user = await createUser()
        const event = await createEvent()
        const exercise = await createExercise(event)
        const exerciseResponse = await createResponse(exercise)
        let response = await agent
            .delete(`/responses/${exerciseResponse.id}`)
            .expect(200)
        await agent.get(`/responses/${exerciseResponse.id}`).expect(404)
    })
})
