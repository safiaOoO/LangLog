const express = require("express")
const userController = require("../controllers/userController")

const router = express.Router()

router.get('/', userController.checkUser)
router.post("/followUser", userController.followUser)
router.post("/unfollowUser", userController.unfollowUser)

module.exports = router