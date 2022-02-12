import {React, useEffect} from "react"
import {useGlobalContext} from "../../store"
export default function AssignID({id, setEventID}) {
    const {user} = useGlobalContext()
    useEffect(() => {
        if (id !== undefined) {
            for (var i = 0; i < user.data.events.length; i += 1) {
                if (id === user.data.events[i].id) {
                    setEventID(i)
                }
            }
        }
    }, [])
    return <div></div>
}
