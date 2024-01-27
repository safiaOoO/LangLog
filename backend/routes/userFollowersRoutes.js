const express = require('express')
const router = express.Router()
const userFollowerController = require('../controllers/userFollowersController')

router.get('/userStats', userFollowerController.getUserStats)
router.get('/:idUSer/Followers', userFollowerController.getUserFollowers)
router.get('/:idUser/Followings', userFollowerController.getuserFollowings)

module.exports = router