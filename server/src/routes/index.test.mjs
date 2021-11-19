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

describe("GET /users/:userId", () => {
  it("should get a user", async () => {
    const userId = 1

    const response = await agent.get(`/users/${userId}`).expect(200)

    console.log(response.body)
  })
})

function createUser() {
  return agent
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

describe.only("POST /event", () => {
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
