const express = require('express')
const router = express.Router()
const postInteractingController = require('../controllers/postInteractingController')

router.post('/:postId/comment', postInteractingController.addComment)
router.post('/:postId/like', postInteractingController.likePost)
router.post('/:postId/unlike', postInteractingController.unlikePost)
router.post('/:postId/save', postInteractingController.savePost)
router.post('/:postId/unsave', postInteractingController.unsavePost)
router.post('/:postId/comments', postInteractingController.getComments)



module.exports = router
