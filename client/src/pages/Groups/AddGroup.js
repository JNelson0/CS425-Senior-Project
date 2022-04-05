import "./AddGroup.scss"
import {React, useState, useEffect, useCallback} from "react"
import {useGlobalContext} from "../../store"
import AddGroupDetails from "./AddGroupDetails.js"
import CloseIcon from "@mui/icons-material/Close"

let inviteeIds = []
let id
let invitees = []

export default function AddGroup({addOpen, setAddOpen, darkmode}) {
    const {
        user,  
        createGroupQuery,
        addMemberToGroupQuery,
        userByUsernameQuery,
    } = useGlobalContext()

    const [groupDetails, setGroupDetails] = useState({
        tag: "",
        usernameCSV: "",
    })

    const resetInput = () => {
        setGroupDetails({
            tag: "",
            usernameCSV: "",
        })
    }

    async function handleSubmit() {
        setAddOpen(!addOpen)
        setAddGroup(true)
    }
    const handleClose = () => {
        setAddOpen(!addOpen)
    }

    const [error, setError] = useState()
    const [addGroup, setAddGroup] = useState(false)
    const [addUserToGroup, setAddUserToGroup] = useState(false)
    const [idsToAdd, setIdsToAdd] = useState([])

    useEffect(() => {
        if (addGroup) {
            ;(async () => {
                const groupId = await createGroupQuery({
                    tag: groupDetails.tag
                })
                id = parseInt(groupId, 10)
                invitees = groupDetails.usernameCSV.split(',')
                for(const key of invitees) {
                    const id = await userByUsernameQuery(key)
                    setIdsToAdd(oldArray => [...oldArray, id])
                }
            })()
                .catch(setError)
                .finally(() => {
                    setAddGroup(false)
                    setAddUserToGroup(true)
                })
        }
    }, [addGroup])

    useEffect(() => {
        if(addUserToGroup) {
            ;(async () => {
                console.log(id)
                await addMemberToGroupQuery(id, {
                    userIds: idsToAdd
               })
            })()
                .catch(setError)
                .finally(() => {
                    resetInput()
                    setAddUserToGroup(false)
                    window.location.reload()
                })
        }
    }, [addUserToGroup])

    return (
        <div class={"theme " + (darkmode ? "light" : "dark")}>
            <div className={"add-group " + (addOpen && "active")}>
                <div className="top">
                    <div className="topSplit1"></div>
                    <div className="topSplit2"></div>
                    <div className="topSplit3">
                        <div className="closeMenu" onClick={handleClose}>
                            <CloseIcon sx={{fontSize: 33}} />
                        </div>
                    </div>
                </div>
                <div className="middle">
                    <AddGroupDetails 
                        setAddOpen={setAddOpen}
                        addOpen={addOpen}
                        groupDetails={groupDetails}
                        setGroupDetails={setGroupDetails}
                    />
                </div>
                <div className="bottom">
                    <div className="buttonWrapper">
                        <button type="reset" onClick={resetInput}>
                            Clear
                        </button>
                        <button type="submit" onClick={handleSubmit}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}