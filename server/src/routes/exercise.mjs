import router from "./router"

// Coach or user lists exercises (Maybe move to get event)
router.get("/events/:eventId/exercises")

// This one is used when creating an exercise event
// router.post("/event")

// This one is used when adding exercises to existing event
router.post("/events/:eventId/exercise")

router.get("/exercise/:exerciseId")

// This one modifies existing exercise
// Deletes all exercise responses associated with it
router.put("/exercise/:exerciseId")

// This one deletes existing exercise
router.delete("/exercise/:exerciseId")

// User responds to exercise
router.post("/exercise/:exerciseId/response")

router.put("/exercise/:exerciseId/responses/:responseId")

router.delete("/exercise/:exerciseId/responses/:responseId")
