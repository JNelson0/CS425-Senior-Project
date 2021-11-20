import router from "./router"

// Create group
router.post("/group")

// Get group
router.get("/groups/:groupId")

// Might not need to exist
router.get("/groups/findBy" /* ?tag=${tagId} */)

// Modifies group name
router.put("/groups/:groupId")

// Adds group member
router.post("/groups/:groupId/member")

// Delete group member
router.delete("/groups/:groupId/members/:memberId")

// Delete group
router.delete("/groups/:groupId")
