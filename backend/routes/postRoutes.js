const express = require('express')
const router = express.Router()
const PostController = require('../controllers/postController')
const postController = require('../controllers/postController')


router.post('/api/createPosts', PostController.createPost)
router.delete('/api/posts/:idPost', PostController.deletePost)
router.put('/api/posts/:idPost', PostController.editPost)
router.get('/api/:idUser/myPosts', PostController.getUserPost)
router.get('/api/:idUser/postsPage', PostController.getUserPostPage)
router.get('/api/:idPost', postController.getPostInfo)
module.exports = router