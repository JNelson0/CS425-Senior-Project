import crypto from "node:crypto"
import util from "node:util"

const pbkdf2Async = util.promisify(crypto.pbkdf2)

async function hashPassword(password, salt) {
  const digest = await pbkdf2Async(password, salt, 100000, 64, "sha512")
  return digest.toString("base64")
}

export default hashPassword
