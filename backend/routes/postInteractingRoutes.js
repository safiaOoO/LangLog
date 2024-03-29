const express = require('express')
const router = express.Router()
const postInteractingController = require('../controllers/postInteractingController')

router.post('/:postId/comment', postInteractingController.addComment)
router.post('/:postId/like', postInteractingController.likePost)
router.post('/:postId/unlike', postInteractingController.unlikePost)
router.post('/:postId/save', postInteractingController.savePost)
router.post('/:postId/unsave', postInteractingController.unsavePost)
router.get('/:postId/comments', postInteractingController.getComments)
router.get('/:postId', postInteractingController.getContent)



module.exports = router
