const express = require("express")
const languagesController = require("../controllers/languagesController")

const router = express.Router()

router.get("/", languagesController.getLanguages)
router.get("/toLearn", languagesController.getLanguagestoLearn)
router.get("/learning", languagesController.getLanguagesLearning)

module.exports = router