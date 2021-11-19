import "dotenv/config"
import supertest from "supertest"
import app from "./src/app.mjs"

globalThis.agent = supertest.agent(app)
