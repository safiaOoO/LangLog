const express = require("express")
const userController = require("../controllers/userController")

const router = express.Router()

router.get('/checkUser', userController.checkUser)
router.post("/followUser", userController.followUser)
router.post("/unfollowUser", userController.unfollowUser)
router.post('/updateProfile', userController.updateProfile)
router.get('/getProfile',userController.getProfile)
router.get('/checkFollow/:followingUserId',userController.checkFollow)

module.exports = router