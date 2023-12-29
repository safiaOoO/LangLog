const db = require("../config/db")

const userController = {
  checkUser: (req,res) => {
    if(req.session.userID){
      return res.json({valid:true})
    }else{
      return res.json({valid:false})
  }
  },

  followUser: (req,res)=>{ // post
    const sqlFollow = 'INSERT INTO userfollowers (`idFollower`,`idFollowing`) VALUES (?)'
    const follower = req.session.userID
    const following = req.body.user_id

    db.query(sqlFollow, [follower,following], (err)=>{
      if (err) {
        console.error("Error inserting follower-following:", err)
        return res.json({ error: "Error inserting follower-following" })
      }
    })
    return res.json({ success: true, message: "Success",test:`the user with the id ${follower} is following the user with the id ${following}` })
  },

  unfollowUser: (req,res) =>{ //post
    const sqlUnFollow = 'DELETE FROM userfollowers WHERE idFollower = ? AND idFollowing = ?'
    const follower = req.session.userID
    const following = req.body.user_id

    db.query(sqlUnFollow, [follower, following], (err) => {
        if (err) {
            console.error("Error unfollowing user:", err);
            res.json({ success: false, message: "Internal server error" });
        } else {
            res.json({ success: true, message: `Successfully ${follower} unfollowed ${following}` });
        }
    })
  }
}


module.exports = userController
