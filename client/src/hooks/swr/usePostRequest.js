import {useCallback, useState} from "react"
import useSWR, {useSWRConfig} from "swr"
import jsonResponseFetcher from "./jsonResponseFetcher"

// TODO: Maybe should connect to "true" useSWR instance.
const usePostRequest = (pathname, keyFn) => {
  const {mutate} = useSWRConfig()

  const [data, setData] = useState()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)

  const request = useCallback(
    body => {
      setLoading(true)
      setData(undefined)
      setError(undefined)

      //Sends request to db, then updates based on userID
      jsonResponseFetcher(pathname, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body),
      })
        .then(data => {
          setData(data)
          mutate(keyFn(data), data, false)
        })
        .catch(setError)
        .finally(() => setLoading(false))
    },
    [pathname, keyFn, mutate],
  )

  return {
    request,
    data,
    error,
    loading,
  }
}

export default usePostRequest
