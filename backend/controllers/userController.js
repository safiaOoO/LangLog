const db = require("../config/db")

const userController = {
  checkUser: (req,res) => {
    console.log(req.session.userID)
    if(req.session.userID){
      return res.json({valid:true})
    }else{
      return res.json({valid:false})
  }
  },

  getUsernameProfilePic : (req,res) =>{
    const sql = 'SELECT username, profilePicturePath FROM users WHERE idUser = ?'
    if(req.session.userID){
      db.query(sql,[req.session.userID],(err,data)=>{
        if(err){
          console.error("Error getting username and profile picture path:", err)
          return res.json({ success: false, message: "Internal server error" })
        }else{
          console.log('iam here', data[0].username)
          return res.json({success : true, username : data[0].username, profilePicturePath : data[0].profilePicturePath})
        }
      })
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

  updateProfile: (req, res) => {
  const userId = req.session.userID
  const updatedData = req.body

  const sqlUpdateUser = `UPDATE users SET username = ?, fullName = ?, bio = ? WHERE idUser = ?`
  const sqlCheckUsername = 'SELECT * FROM users WHERE username = ? AND idUser != ?'

  db.query(sqlCheckUsername, [updatedData.username, userId], (err, data) => {
    if (err) {
      console.error("Error checking username:", err)
      return res.json({ success: false, message: "Internal server error" })
    }

    console.log(data)

    if (data.length !== 0) {
      return res.json({ success: false, message: "The username you entered already exists" })
    }

    const values = [updatedData.username, updatedData.fullname, updatedData.bio, userId]

    db.query(sqlUpdateUser, values, (err) => {
      if (err) {
        console.error("Error updating user's data:", err);
        return res.json({ success: false, message: "Internal server error" })
      }
      if (updatedData.languagetolearn.length > 0) {
        const sqlToLearn = "INSERT INTO languagetolearn (`idUser`, `codeLanguage`) VALUES ?"
        const languagestolearn = updatedData.languagetolearn
        const languagestolearnValues = languagestolearn.map(language => [userId, language])
        db.query(sqlToLearn, [languagestolearnValues], (err) => {
          if (err) {
            console.error("Error inserting languages to learn:", err)
            return res.json({ success: false, message: "Internal server error" })
          }
          if (updatedData.languagespeak.length > 0) {
            const sqlSpeak = "INSERT INTO languagespeak (`idUser`, `codeLanguage`) VALUES ?"
            const languagesspeak = updatedData.languagespeak
            const languagesspeakValues = languagesspeak.map(language => [userId, language])
            db.query(sqlSpeak, [languagesspeakValues], (err) => {
              if (err) {
                console.error("Error inserting languages spoken:", err)
                return res.json({ success: false, message: "Internal server error" })
              }
              res.json({ success: true, message: "Updated successfully" })
            });
          } else {
            res.json({ success: true, message: "Updated successfully" })
          }
        })
      } else {
        if (updatedData.languagespeak.length > 0) {
          const sqlSpeak = "INSERT INTO languagespeak (`idUser`, `codeLanguage`) VALUES ?"
          const languagesspeak = updatedData.languagespeak
          const languagesspeakValues = languagesspeak.map(language => [userId, language])
          db.query(sqlSpeak, [languagesspeakValues], (err) => {
            if (err) {
              console.error("Error inserting languages spoken:", err)
              return res.json({ success: false, message: "Internal server error" })
            }
            res.json({ success: true, message: "Updated successfully" })
          })
        } else {
          res.json({ success: true, message: "Updated successfully" })
        }
      }
    })
  })
},


  getProfile : (req,res) => {
    const userId = req.session.userID
    const sql = 'SELECT fullname, username, bio, profilePicturePath FROM users WHERE idUser = ?'
    const sqlLearning = 'SELECT GROUP_CONCAT(languages.languageName) AS languageNames FROM languagetolearn JOIN languages ON languagetolearn.codeLanguage = languages.codeLanguage WHERE languagetolearn.idUser = ?'
    const sqlSpeaking = 'SELECT GROUP_CONCAT(languages.languageName) AS languageNames FROM languagespeak JOIN languages ON languagespeak.codeLanguage = languages.codeLanguage WHERE languagespeak.idUser = ?'

    db.query(sql, userId, (err, userData) => {
      if (err) {
        console.error("Error getting user's data:", err)
        res.json({ success: false, message: "Internal server error" })
      } else {
        db.query(sqlSpeaking, userId, (err, speakingData) => {
          if (err) {
            console.error("Error getting user's spoken languages:", err)
            res.json({ success: false, message: "Internal server error" })
          } else {
            userData[0].languagesspeak = speakingData[0].languageNames.split(',')
            db.query(sqlLearning, userId, (err, learningData) => {
              if (err) {
                console.error("Error getting user's learning languages:", err)
                res.json({ success: false, message: "Internal server error" })
              } else {
                userData[0].languagestolearn = learningData[0].languageNames.split(',')
                res.json({ success: true, user: userData })
              }
            });
          }
        })
      }
    })

  },

  checkFollow : (req,res) =>{
    const user = req.session.userID
    const following = req.params.followingUserId
    const sqlCheck = 'SELECT * FROM userfollowers WHERE idFollowing = ? AND idFollower = ?'

    db.query(sql,[following,user],(err,data)=>{
      if (err) {
        console.error("Error checking follow :", err)
        res.json({ success: false, message: "Internal server error" })
      }else {
        if(data.length>0){
          res.json({ success: true, following: true })
        }else{
          res.json({ success: true, following: false })
        }
      }
    })
  }
}


module.exports = userController
