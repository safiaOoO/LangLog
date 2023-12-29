const db = require("../config/db")
const path = require("path")
const fs = require("fs")
const { dataUriToBuffer } = require ('data-uri-to-buffer')

const authController = { 
  signup: (req, res) => {
    const sql = "INSERT INTO users (`username`,`fullName`, `email`, `password`, `profilePicturePath`) VALUES (?)"
    const userData = req.body

    const picture = `${Date.now()}-${userData.pictureName}` // safia has to put the value of the picture the path to the default pic if it doesn't work i make a function that add the default-pic if the user don't enter a pic
    const picturePath = path.join(__dirname,"../public/profilePictures",picture)

    const languagesspeak = userData.languagesspeak
    const languagestolearn = userData.languagestolearn

    const sqlToLearn = " INSERT INTO languagetolearn (`idUser`, `codeLanguage`) VALUES (?)" // safia should put the values of the option language.codeLanguage and the language can be the between >lang<
    const sqlSpeak = " INSERT INTO languagespeak (`idUser`, `codeLanguage`) VALUES (?)" // safia should put the values of the option language.codeLanguage and the language can be the between >lang<

    const values = [userData.username, userData.fullname, userData.email, userData.password,`/profilePictures/${picture}`]

    const parsed = Buffer.from((dataUriToBuffer(req.body.picture).buffer))
    console.log(parsed)

    if (userData.pictureName != 'defaultProfilePicture.png'){
      fs.writeFile(picturePath, parsed,(err)=>{
        if (err){
          console.error("Error saving profile picture:", err)
          return res.json({ error: "Error saving profile picture" })
        }
        console.log("Profile picture saved successfully")
      })
    }

    db.query(sql, [values], (err, data) => {
      if (err) {
        console.error("Error inserting the user:", err)
        return res.json({ error: "Error inserting the user" })
      }
      const id = data.insertId
      console.log(id)
      const languagesspeakValues = languagesspeak.map(language => [id, language])
      const languagestolearnValues = languagestolearn.map(language => [id, language])
      db.query(sqlSpeak,languagesspeakValues,(err)=>{
        if (err) {
          console.error("Error inserting languages spoken:", err)
          return res.json({ error: "Error inserting languages spoken" })
        }
      })
      db.query(sqlToLearn,languagestolearnValues,(err)=>{
        if (err) {
          console.error("Error inserting languages spoken:", err)
          return res.json({ error: "Error inserting languages to learn" })
        }
      })
      return res.json({ success: true, message: "Success",test:`the user with the id ${id} is registered` })
    })
  },

  login: (req, res) => {
    const sql = `SELECT * FROM users WHERE email = ? AND password = ?`
    const values = [req.body.email, req.body.password]

    db.query(sql, values, (err, data) => {
      if (err) {
        console.error("Error executing SQL query:", err)
        return res.status(500).json({ error: "Internal Server Error" })
      }
      
      if (data.length > 0) {
        req.session.username = data[0].username
        req.session.userID = data[0].idUser
        res.cookie('testCookie', 'testValue', { sameSite: 'None', secure: false }) // secure can be false when just testing
        console.log(req.session.userID)
        return res.json({ Login: true })

      } else {
        const sqlEmail = `SELECT * FROM users WHERE email = ?`
        db.query(sqlEmail,req.body.email,(err,data)=>{
          if (err) {
            console.error("Error executing SQL query:", err)
            return res.status(500).json({ error: "Internal Server Error" })
          }
          if(data.length > 0){
            return res.json({ Login: false, password:true })
          }else{
            return res.json({ Login: false })
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
