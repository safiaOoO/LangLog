const express = require('express')
const router = express.Router()
const PostController = require('../controllers/postController')


router.post('/createPosts', PostController.createPost)
router.delete('/posts/:id', PostController.deletePost)
router.put('/posts/:id', PostController.editPost)

module.exports = router