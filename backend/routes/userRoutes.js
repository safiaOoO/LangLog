const express = require("express")
const userController = require("../controllers/userController")
const multer = require('multer')

const upload = multer()

const router = express.Router()

router.get('/', userController.checkUser)
router.post("/followUser", userController.followUser)
router.post("/unfollowUser", userController.unfollowUser)
router.post('/updateProfile', upload.single('picture'), userController.updateProfile)
router.get('/updateProfile',userController.getProfile)

module.exports = router