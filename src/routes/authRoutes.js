const express = require("express")
const router = express.Router()

const authController = require("../controllers/authControllers")
const profileController = require("../controllers/profileController")
const middleware = require("../middleware/authMiddleware")
const upload = require("../config/multerConfig");

router.post("/register", authController.registerUser)
router.post("/login", authController.loginUser)

router.post("/create-profile",   upload.fields([
    { name: "fee_receipt", maxCount: 1 },
    { name: "id_proof", maxCount: 1 },
    { name: "profile_image", maxCount: 1 },
  ]), middleware.protect, profileController.createStudentProfile)
router.patch("/edit-profile", middleware.protect, profileController.updateStudentProfile)

router.post("/add-interest", authController.addinterest)


module.exports = router