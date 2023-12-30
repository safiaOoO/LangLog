const db = require("../config/db")
const path = require("path")
const fs = require("fs")
const { dataUriToBuffer } = require ('data-uri-to-buffer')

const authController = { 

  signup: (req, res) => {
    const sql = "INSERT INTO users (`username`,`fullName`, `email`, `password`, `profilePicturePath`) VALUES (?)"
    const userData = req.body

    const sqlCheckEmail = 'SELECT * FROM users WHERE email = ?'
    const sqlCheckUsername = 'SELECT * FROM users WHERE username = ?'
    
    let canInsert = true

    db.query(sqlCheckEmail,[userData.email],(err,data)=>{
      if (err){
        console.error("Error checking email:", err)
        return res.json({ success: false, message: "Internal server error" })
      }
      if(data.length>0){
        canInsert = false
        return res.json({ success: false, message: "The email you entered already exists" })
      }

      db.query(sqlCheckUsername,[userData.username],(err,data)=>{
        if (err){
          console.error("Error checking username:", err)
          return res.json({ success: false, message: "Internal server error" })
        }
        if(data.length>0){
          canInsert = false
          return res.json({ success: false, message: "The username you entered already exists" })
        }

        if (canInsert){
          console.log(canInsert)
          const languagesspeak = userData.languagesspeak
          const languagestolearn = userData.languagestolearn

          const sqlToLearn = " INSERT INTO languagetolearn (`idUser`, `codeLanguage`) VALUES (?)" // safia should put the values of the option language.codeLanguage and the language can be the between >lang<
          const sqlSpeak = " INSERT INTO languagespeak (`idUser`, `codeLanguage`) VALUES (?)" // safia should put the values of the option language.codeLanguage and the language can be the between >lang<

          var values = [userData.username, userData.fullname, userData.email, userData.password]

          if (userData.pictureName != ''){
            const picture = `${Date.now()}-${userData.pictureName}`
            const picturePath = path.join(__dirname,"../public/profilePictures",picture)
            values.push(`/profilePictures/${picture}`)
            const parsed = Buffer.from((dataUriToBuffer(req.body.picture).buffer))
            fs.writeFile(picturePath, parsed,(err)=>{
              if (err){
                console.error("Error saving profile picture:", err)
                return res.json({ success: false, message: "Internal server error" })
              }
              console.log("Profile picture saved successfully")
            })
          }else{
            values.push(`/profilePictures/defaultProfilePicture.png`)
          }

          db.query(sql, [values], (err, data) => {
            if (err) {
              console.error("Error inserting the user:", err)
              return res.json({ success: false, message: "Internal server error" })
            }
            const id = data.insertId
            console.log(id)
            const languagesspeakValues = languagesspeak.map(language => [id, language])
            const languagestolearnValues = languagestolearn.map(language => [id, language])
            db.query(sqlSpeak,languagesspeakValues,(err)=>{
              if (err) {
                console.error("Error inserting languages spoken:", err)
                return res.json({ success: false, message: "Internal server error" })
              }
            })
            db.query(sqlToLearn,languagestolearnValues,(err)=>{
              if (err) {
                console.error("Error inserting languages spoken:", err)
                return res.json({ success: false, message: "Internal server error" })
              }
            })
            return res.json({ success: true, message: "Success"})
          })
        }
      })
    })
  },

  login: (req, res) => {
    const sql = `SELECT * FROM users WHERE (email = ? OR username = ?) AND password = ?`
    let values = [req.body.email,req.body.email, req.body.password]

    db.query(sql, values, (err, data) => {
      if (err) {
        console.error("Error executing SQL query:", err)
        return res.json({ success: false, message: "Internal server error" })
      }
      
      if (data.length > 0) {
        req.session.username = data[0].username
        req.session.userID = data[0].idUser
        res.cookie('testCookie', 'testValue', { sameSite: 'None', secure: false }) // secure can be false when just testing
        console.log(req.session.userID)
        return res.json({ Login: true })
      } else {
        const sqlEmailUsername = `SELECT * FROM users WHERE (email = ? OR username = ?)`
        const pass = values.pop()
        db.query(sqlEmailUsername,values,(err,data)=>{
          if (err) {
            console.error("Error executing SQL query:", err)
            return res.json({ success: false, message: "Internal server error" })
          }
          if(data.length > 0){
            return res.json({ Login: false, message:"The password is wrong" })
          }else{
            return res.json({ Login: false,message:"The email or the username you entered doesn't exist" })
          }
        })
      }

    })
  },

  logout: (req, res) => {
    console.log(req.session.userID)
    if (req.session.userID) {
      res.clearCookie("connect.sid", { secure: true });
      req.session.destroy()
      res.status(200).json({ message: "Logout successful" })
    } else {
      res.status(401).json({ error: "User not logged in" })
    }
  },
}

module.exports = authController
