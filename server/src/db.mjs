// import {PrismaClient} from "@prisma/client"

import pkg from "@prisma/client"
const {PrismaClient} = pkg

const db = new PrismaClient()

export default db
