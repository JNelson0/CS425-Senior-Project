import {usePostRequest} from "./swr"

const useNewUser = () => usePostRequest("/user", data => `/users/{data.id}`)

export default useNewUser
