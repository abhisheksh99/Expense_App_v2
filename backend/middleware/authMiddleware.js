import jwt from "jsonwebtoken"

const isAuthenticated = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '')

    if (!token) {
        return res.status(401).json({ message: "No token provided" })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded.id
        next()
    } catch (error) {
        res.status(401).json({ message: "Invalid or expired token" })
    }
}

export default isAuthenticated