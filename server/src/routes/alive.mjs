import router from "./router"

router.get(["/", "/_alive"], async (req, res) => {
  return res.end()
})
