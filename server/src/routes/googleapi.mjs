import router from "./router"
import db from "../db"
import {onlyAuthenticated} from "../middleware"
import {google} from "googleapis"
import 'dotenv/config'

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const REDIRECT_URL = "http://localhost:3000"

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URL
);

const scopes = [
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/calendar.events',
    'https://www.googleapis.com/auth/calendar.readonly',
    'https://www.googleapis.com/auth/userinfo.profile',
]

const authorizationUri = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes
});

router.post("/googleapi/generate-auth-token", onlyAuthenticated, async (req, res, next) => {
    try {
        const {code} = req.body
        const {tokens} = await oauth2Client.getToken(code)
        console.log(tokens)
        console.log("\n REFRESH TOKEN: \n")
        console.log(tokens.refresh_token)

        
        const storeToken = await db.user.update({
            where: {
                id: req.user.id,
            },
            data: {
                googleRefreshToken: tokens.refresh_token,
            },
        })
        res.send(true)
    } catch(error) {
        next(error)
    }
})

router.get("/googleapi/check-usertokens", onlyAuthenticated, async(req, res, next) => {
    try {
        const currentUser = await db.user.findUnique({
            where: {
                id: req.user.id,
            },
        })

        if(!currentUser.googleRefreshToken)
            return res.send(false)
        else
            return res.send(true)
    } catch(error) {
        next(error)
    }
})

router.post("/googleapi/create-event", onlyAuthenticated, async(req, res, next) => {
    try {
        const currentUser = await db.user.findUnique({
            where: {
                id: req.user.id,
            },
        })
        console.log(currentUser.googleRefreshToken)
        oauth2Client.setCredentials({refresh_token: currentUser.googleRefreshToken})
        const calendar = google.calendar('v3')
        const response = await calendar.events.insert({
            auth: oauth2Client,
            calendarId: 'primary',
            requestBody: {
                summary: req.body.summary,
                description: req.body.description,
                colorId: '2',
                start: {
                    dateTime: new Date(req.body.startTime)
                },
                end: {
                    dateTime: new Date(req.body.endTime)
                }
            }
        })
        res.send(true)

    } catch(error) {
        next(error)
    }
})

