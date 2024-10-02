
const errorHandlerMiddleware = (err,res,req,next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode)
    res.json({
        message: err.message,
        stack: err.stack,
    })

}

export default errorHandlerMiddleware