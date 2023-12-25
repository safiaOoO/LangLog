const db = require("../config/db")

const userController = {
  getUser: (req, res) => {  // get
    if (req.session.username) {
      return res.json({ valid: true, username: req.session.username })
    } else {
      return res.json({ valid: false })
    }
  },

  followUser: (req,res)=>{ // post
    const sqlFollow = 'INSERT INTO userfollowers (`idFollower`,`idFollowing`) VALUES (?)'
    const follower = req.session.id
    const following = req.body.user_id
    console.log(req.session)
    console.log(req.body)

    db.query(sqlFollow, [follower,following], (err)=>{
      if (err) {
        console.error("Error inserting follower-following:", err)
        return res.json({ error: "Error inserting follower-following" })
      }
    })
    return res.json({ success: true, message: "Success",test:`the user with the id ${follower} is following the user with the id ${following}` })
  }
}

// i should add here follow and unfollow user


module.exports = userController
