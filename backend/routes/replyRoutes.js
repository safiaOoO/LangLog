const express = require('express')
const router = express.Router()
const replyController = require('../controllers/replyController')

router.post('/:replyId/like', replyController.likeReply)
router.post('/:replyId/unlike', replyController.unlikeReply)

module.exports = router;
