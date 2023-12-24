const db = require("../config/db")
const path = require("path")
const fs = require("fs")

const authController = {   // i should add languages to learn and learnt languages
  signup: (req, res) => {
    const sql = "INSERT INTO users (`username`,`fullName`, `email`, `password`, `profilePicturePath`) VALUES (?)"
    const picture = `${Date.now()}-${req.file.originalname}`
    const picturePath = path.join(__dirname,"../public/profilePictures",picture)

    fs.writeFile(picturePath, req.file.buffer,(err)=>{
      if (err){
        console.error("Error saving profile picture:", err)
        return res.json({ error: "Error saving profile picture" })
      }

      const values = [req.body.username, req.body.fullname, req.body.email, req.body.password, `/profilePictures/${picture}`]
      db.query(sql, [values], (err, data) => {
        if (err) {
          console.error("Error executing SQL query:", err)
          return res.json({ error: "Error executing SQL query" })
        }
        return res.json({ success: true, message: "Success" })
      })
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
        console.log(req.session.username)
        return res.json({ Login: true })
      } else {
        return res.json({ Login: false })
      }
    })
  },

  logout: (req, res) => {
    if (req.session.username) {
      req.session.destroy()
      res.clearCookie("connect.sid")
      res.status(200).json({ message: "Logout successful" })
    } else {
      res.status(401).json({ error: "User not logged in" })
    }
  },
}

module.exports = authController
