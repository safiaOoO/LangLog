const db = require("../config/db")

userFollowerController = {
    getUserStats: async (req, res) => {
        try {
            const userId = req.params.id
            const sql = 'SELECT numOfPosts, numOfFollowers, numOfFollowings from userstats where idUser = ?'
            const result = await db.query(sql, [userId])

            res.json(result).status(201)
        } catch (error) {
            console.error(error)
            res.status(500).json({error : 'Internal Server Error'})
        }
    },

    getUserFollowers: async(req,res) => {
        try {
            const userId = req.session.idUser 
            const sql = 'SELECT idFollower FROM userFollowers WHERE idFollowing = ? '
            const result = await db.query(sql, [userId])

            res.status(201).json(result) 
        } catch (error) {
            console.error(error)
            res.status(500).json({error : 'Internal Server Error'})
        }
    },
    getUserFollowers: async(req,res) => {
        try {
            const userId = req.session.idUser 
            const sql = 'SELECT idFollowing FROM userFollowers WHERE idFollower = ?'
            const result = await db.query(sql, [userId])

            res.status(201).json(result) 
        } catch (error) {
            console.error(error)
            res.status(500).json({error : 'Internal Server Error'})
        }
    }
}

module.exports = userFollowerController