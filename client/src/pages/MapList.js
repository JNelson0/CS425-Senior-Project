import {React, useEffect} from "react"
import {useGlobalContext} from "../store"

export default function MapList({list, setLoading}) {
    const {user, currentUserEventQuery, currentUserQuery} = useGlobalContext()

    async function mapping() {
        const delay = ms =>
            new Promise(res => {
                setTimeout(res, ms)
            })
        await currentUserEventQuery()
        await delay(500)
        console.log(user)

        user.data.events.map(e => {
            list.push({
                Id: parseInt(e.id),
                Subject: e.title,
                StartTime: e.start,
                EndTime: e.finish,
            })
        })
        setLoading(false)
    }

    useEffect(() => {
        mapping()
    }, [])
    return <div />
}
