import express from "express"
import { registerUser, loginUser, profileUser, UpdatePassword, updateUserProfile } from "../controllers/userController.js"
import  isAuthenticated from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/profile", isAuthenticated, profileUser)
router.put("/update-password", isAuthenticated, UpdatePassword)
router.put("/update-profile", isAuthenticated, updateUserProfile)

export default router