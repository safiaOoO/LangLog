const express = require('express')
const router = express.Router()
const commentController = require('../controllers/commentController')

router.post('/:commentId/like', commentController.likeComment)
router.post('/:commentId/unlike', commentController.unlikeComment)
router.post('/:commentId/reply', commentController.replyToComment)
router.get('/:commentId/replies', commentController.getRepliesForComment)


module.exports = router
