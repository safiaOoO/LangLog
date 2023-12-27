const express = require("express")
const postInteractingController = require("../controllers/postInteractingController")

const router = express.Router()

router.post("/postComment", postInteractingController.postComment)
router.post("/postLike", postInteractingController.postLike)
router.post("/replyComment", postInteractingController.replyComment)
router.post("/commentLike", postInteractingController.commentLike)
router.post("/replyLike", postInteractingController.replyLike)
router.post("/savePost", postInteractingController.savePost)
router.post("/unsavePost", postInteractingController.unsavePost)

module.exports = router