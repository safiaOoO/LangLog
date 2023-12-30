const express = require("express")
const languagesController = require("../controllers/languagesController")

const router = express.Router()

router.get("/", languagesController.getLanguages)
router.get("/speak", languagesController.getLanguagesToSpeak)
router.get("/learn", languagesController.getLanguagesLearn)

module.exports = router