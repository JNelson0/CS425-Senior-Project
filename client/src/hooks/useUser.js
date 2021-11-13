import useSWR from "swr"
import {jsonResponseFetcher} from "./swr"

const useUser = userId => {
  const {data, error} = useSWR(`/users/${userId}`, jsonResponseFetcher)

  return {
    data,
    error,
    loading: data == null && error == null,
  }
}

export default useUser
