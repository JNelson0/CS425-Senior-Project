//Switch which is commented for developing

//Uncomment/Comment to run test
import {PrismaClient} from "@prisma/client"

//Uncomment/Comment to run local host and to seed db
// import pkg from "@prisma/client"
// const {PrismaClient} = pkg

const db = new PrismaClient()

export default db
