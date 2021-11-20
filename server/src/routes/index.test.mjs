import {randomBytes} from "crypto"
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
        firstName: "Conor",
        lastName: "Pezeshki",
        username: "condog" + randomBytes(10).toString("base64"),
      })
      .set("Content-Type", "application/json")
      .expect(200)

    console.log(response.body)
  })
})

describe.only("POST /user/login", () => {
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

describe.only("PUT /events/:eventId", () => {
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
        invitees: [user2.id],
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
    console.log(event)
    let response = await agent
      .post(`/events/${event.id}/invitees`)
      .send({
        invitees: [user2.id],
      })
      .set("Content-Type", "application/json")
      .expect(200)
    // Testing this function
    response = await agent
      .post(`/events/${event.id}/invitees/remove`)
      .send({
        invitees: [user2.id],
      })
      .set("Content-Type", "application/json")
      .expect(200)

    console.dir(response.body, {depth: Infinity})
  })
})
