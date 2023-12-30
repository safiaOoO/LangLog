const db = require("../config/db")

const userController = {
  checkUser: (req,res) => {
    if(req.session.userID){
      return res.json({valid:true})
    }else{
      return res.json({valid:false})
  }
  },

  followUser: (req,res)=>{
    const sqlFollow = 'INSERT INTO userfollowers (`idFollower`,`idFollowing`) VALUES (?)'
    const follower = req.session.userID
    const following = req.body.user_id

    db.query(sqlFollow, [follower,following], (err)=>{
      if (err) {
        console.error("Error inserting follower-following:", err)
        return res.json({ success: false, message: "Internal server error" })
      }
    })
    return res.json({ success: true, message: "Success",test:`the user with the id ${follower} is following the user with the id ${following}` })
  },

  unfollowUser: (req,res) =>{
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
  },

  updateProfile : (req,res) => {
    const userId = req.session.userID
    const updatedData = req.body // the variable that safia will send
    const sqlGetUser = `SELECT * FROM users WHERE idUser = ${userId}`

    db.query(sqlGetUser,(err,data)=>{
      
    })

  },

  getProfile : (req,res) => {
    const userId = req.session.userID
    const sql = `SELECT * FROM users WHERE idUser = ${userId}`

    db.query(sql,(err,data)=>{
      if (err) {
        console.error("Error getting user's data:", err);
        res.json({ success: false, message: "Internal server error" });
    } else {
        res.json({ success: true, user:data });
    }
    })
  }
}


module.exports = userController
