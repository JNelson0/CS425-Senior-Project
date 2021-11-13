import {ApiError} from "../../errors"

const jsonResponseFetcher = (...args) =>
  fetch(...args).then(async res => {
    // res.ok === 200-299 HTTP Status Code
    if (res.ok) {
      return res.json()
    } else {
      throw ApiError.fromObject(await res.json())
    }
  })

export default jsonResponseFetcher
