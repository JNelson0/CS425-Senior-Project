import express from "express"
import morgan from "morgan"
import HttpError from "./errors/HttpError"
import routes from "./routes/index"

const app = express()

app.use(morgan("dev"))

app.use(express.json())

app.use(routes)

app.use((req, res) => {
  throw new HttpError.NotFound()
})

app.use((err, req, res, next) => {
  if (process.env.NODE_ENV !== "production") {
    console.log("error:", err)
  }

  if (err instanceof HttpError) {
    res.status(err.status).json({
      message: err.message,
      status: err.status,
    })
  } else {
    res.status(500).json({
      message: err.message ?? HttpError.Messages[500],
      status: 500,
    })
  }
  //
})

export default app
