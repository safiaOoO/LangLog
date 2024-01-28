const express = require('express')
const router = express.Router()
const userFollowerController = require('../controllers/userFollowersController')

router.get('/:id/userStats', userFollowerController.getUserStats)
router.get('/Followers', userFollowerController.getUserFollowers)
router.get('/Followings', userFollowerController.getUserFollowings)

module.exports = router