import router from "./router"
import db from "../db"
import {onlyAuthenticated} from "../middleware"
import {google} from "googleapis"
import 'dotenv/config'

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const REDIRECT_URL = "http://localhost:8080"

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URL
);

const scopes = [
    'https://www.googleapis.com/auth/calendar'
]

const authorizationUri = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes
});

router.post("/googleapi/generate-auth-token", onlyAuthenticated, async (req, res, next) => {
    try {
        const {code} = req.body
        const {tokens} = await oauth2Client.getToken(code)

        const storeToken = await db.user.update({
            where: {
                id: req.user.id,
            },
            data: {
                googleRefreshToken: tokens.refresh_token,
            },
        })
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

    } catch(error) {
        next(error)
    }
})

