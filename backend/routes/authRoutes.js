const express = require("express")
const authController = require("../controllers/authController")
const multer = require('multer')

const upload = multer()

const router = express.Router()

router.post("/signup", upload.single('picture'), authController.signup)
router.post("/login", authController.login)
router.post("/logout", authController.logout)

module.exports = router