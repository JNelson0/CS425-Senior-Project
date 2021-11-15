class ApiError extends Error {
  static fromObject(object) {
    return new ApiError(object.message, object.status)
  }

  constructor(message, status) {
    super(message)
    this.status = status
  }
}

export default ApiError
