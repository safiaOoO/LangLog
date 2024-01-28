const express = require('express')
const router = express.Router()
const PostController = require('../controllers/postController')

router.post('/createPosts', PostController.createPost)
router.delete('/deletePost', PostController.deletePost)
router.put('/editPost', PostController.editPost)
router.get('/getPostInfo', PostController.getPostInfo)
router.get('/getPostsPage', PostController.getUserPostPage)
router.get('/myPosts', PostController.getUserPost)
router.get('/mySavedPosts', PostController.getSavedPosts)
router.get('/filterSearch', PostController.searchByFilter)

module.exports = router