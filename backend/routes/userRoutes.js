const express = require("express")
const userController = require("../controllers/userController")

const router = express.Router()

router.get("/getUser", userController.getUser)
router.post("/followUser", userController.followUser)

module.exports = router