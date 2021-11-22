import db from "../db.mjs"
import router from "./router"
import {exerciseInclude} from "../util/includes"
import {toExerciseResponseJson, toExerciseJson} from "../util"
import {onlyAuthenticated} from "../middleware"
import {HttpError} from "../errors"

function bodyToExerciseResponseContent(body, exercise) {
  if (exercise.type !== "WEIGHTS") {
    throw new Error("Exercise type not supported for now.")
  }

  const {weights} = body

  if (
    !Array.isArray(weights) ||
    !weights.every(weight => typeof weight === "number") ||
    weights.length !== exercise.sets
  ) {
    throw new Error("")
  }

  return JSON.stringify({weights})
}

function bodyToExerciseContent(body) {
  if (body.type !== "WEIGHTS") {
    throw new Error()
  }

  const {reps, sets} = body

  // TODO: Validation

  return JSON.stringify({reps, sets})
}

// Coach or user lists exercises (Maybe move to get event)
router.get(
  "/events/:eventId/exercises",
  onlyAuthenticated,
  async (req, res) => {
    const eventId = Number(req.params.eventId)

    const exercises = await db.exercise.findMany({
      where: {eventId},
      include: exerciseInclude,
    })

    if (exercises.length === 0) {
      return res.json([])
    }

    return res.json(exercises.map(toExerciseJson))
  },
)

// This one is used when creating an exercise event
// router.post("/event")

/* 
interface WieghtsExercise {
    type: "WEIGHTS",
    name: string
    reps: number
    sets: number
}  

interface CardioExercise {
    type: "CARDIO",
    name: string
    distance: number
}  

type ExercisePostBody = WieghtsExercise | Cardio
 */

// This one is used when adding exercises to existing event
router.post(
  "/events/:eventId/exercise",
  onlyAuthenticated,
  async (req, res) => {
    const eventId = Number(req.params.eventId)

    const exercise = await db.exercise.create({
      data: {
        type: req.body.type,
        name: req.body.name,
        content: bodyToExerciseContent(req.body),
        eventId,
      },
      include: exerciseInclude,
    })

    return res.json(toExerciseJson(exercise))
  },
)

router.get("/exercise/:exerciseId", onlyAuthenticated, async (req, res) => {
  const exerciseId = Number(req.params.exerciseId)

  const exercise = await db.exercise.findUnique({
    where: {
      id: exerciseId,
    },
    include: exerciseInclude,
  })

  if (exercise == null) {
    throw new HttpError.NotFound("Exercise not found.")
  }

  return res.json(toExerciseJson(exercise))
})

// This one deletes existing exercise
router.delete("/exercise/:exerciseId", onlyAuthenticated, async (req, res) => {
  const exerciseId = Number(req.params.exerciseId)

  await db.$transaction(async db => {
    const exercise = await db.exercise.findUnique({
      where: {
        id: exerciseId,
      },
      include: {
        event: {
          include: {
            userMemberships: true,
          },
        },
      },
    })

    // NOTE: We know this find will have an owner
    const ownerMembership = exercise.event.userMemberships.find(
      membership => membership.role === "OWNER",
    )
    if (ownerMembership.userId !== req.user.id) {
      throw new Error("User not owner of event associated with exercise")
    }

    await db.exerciseResponse.deleteMany({
      where: {
        exerciseId,
      },
    })

    return db.exercise.delete({
      where: {
        id: exerciseId,
      },
    })
  })

  return res.end()
})

// User responds to exercise
router.post(
  "/exercise/:exerciseId/response",
  onlyAuthenticated,
  async (req, res) => {
    const exerciseId = Number(req.params.exerciseId)

    const exerciseResponse = await db.$transaction(async db => {
      const exercise = await db.exercise.findUnique({
        where: {id: exerciseId},
      })

      return db.exerciseResponse.create({
        data: {
          exerciseId,
          userId: Number(req.user.id),
          eventId: exercise.eventId,
          content: bodyToExerciseResponseContent(
            req.body,
            toExerciseJson(exercise),
          ),
        },
      })
    })

    return res.json(toExerciseResponseJson(exerciseResponse))
  },
)

router.put("/responses/:responseId", onlyAuthenticated, async (req, res) => {
  const responseId = Number(req.params.responseId)

  const exerciseResponse = await db.$transaction(async db => {
    const exerciseResponse = await db.exerciseResponse.findUnique({
      where: {id: responseId},
      include: {exercise: true},
    })

    if (exerciseResponse.userId !== req.user.id) {
      throw new Error()
    }

    const content = bodyToExerciseResponseContent(
      req.body,
      toExerciseJson(exerciseResponse.exercise),
    )

    return db.exerciseResponse.update({
      where: {id: responseId},
      data: {content},
    })
  })

  return res.json(toExerciseResponseJson(exerciseResponse))
})

router.delete("/responses/:responseId", onlyAuthenticated, async (req, res) => {
  const responseId = Number(req.params.responseId)

  await db.$transaction(async db => {
    const exerciseResponse = await db.exerciseResponse.findUnique({
      where: {id: responseId},
    })

    if (exerciseResponse.userId !== req.user.id) {
      throw new Error()
    }

    return db.exerciseResponse.delete({
      where: {id: responseId},
    })
  })

  return res.end()
})
