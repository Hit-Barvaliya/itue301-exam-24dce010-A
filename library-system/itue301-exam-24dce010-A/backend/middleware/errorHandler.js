function errorHandler(error, _request, response, _next) {
  let statusCode = error.statusCode || 500
  let message = statusCode === 500 ? 'Internal server error' : error.message

  if (error.name === 'ValidationError') {
    statusCode = 400
    message = Object.values(error.errors).map((item) => item.message).join(', ')
  }
  if (error.name === 'CastError') {
    statusCode = 400
    message = `Invalid ${error.path}`
  }
  if (error.code === 11000) {
    statusCode = 409
    message = 'A record with this unique value already exists'
  }

  response.status(statusCode).json({
    success: false,
    error: {
      status: statusCode,
      message,
    },
  })
}

export default errorHandler
