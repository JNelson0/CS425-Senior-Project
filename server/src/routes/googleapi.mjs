import router from "./router"

const {google} = require('googleapis')
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

router.post('googleapi/generate-auth-token', async (req, res, next) => {
    try {
        const {code} = req.body
        const {tokens} = await oauth2Client.getToken(code)
        //Upload refresh token into database
    } catch(error) {
        next(error)
    }
})

router.post('googleapi/create-event', async(req, res, next) => {
    try {
        const {summary, description, location, startTime, endTime} = req.body
        //USER_REFRESH_TOKEN grabbed from database
        oauth2Client.setCredentials({refresh_token: USER_REFRESH_TOKEN})
        const calendar = google.calendar('v3')
        const response = await calendar.events.insert({
            auth: oauth2Client,
            calendarId: 'primary',
            requestBody: {
                summary: summary,
                description: description,
                location: location,
                colorId: '2',
                start: {
                    dateTime: new Date(startTime)
                },
                end: {
                    dateTime: new Date(endTime)
                }
            }
        })

    } catch(error) {
        next(error)
    }
})

