const fs = require("node:fs")
const util = require("node:util")

util
  .promisify(fs.readFile)(__filename)
  .then(function onSuccess(data) {
    return data.toString()
  })
  .then(dataString => {
    console.log(dataString)
  })
  .catch(function onFailure() {
    console.error(error)
    process.exit(-1)
  })
