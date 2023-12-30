const db = require("../config/db")

const languagesController = {
  getLanguages: (req, res) => {
    const sql = 'SELECT * FROM languages'
    
    db.query(sql,(err,data)=>{
      if(err){
        console.error("Error saving getting languages:", err)
        return res.json({ success: false, message: "Internal server error" })
      }
      return res.json(data)
    })
  },

  getLanguagesToSpeak: (req,res)=>{ // get the languages that the user don't speak and didn't start learning them
    const userID = req.session.userID
    const sqlLanguages = `SELECT * FROM languages WHERE codeLanguage NOT IN ( SELECT codeLanguage FROM languagespeak WHERE idUser = ${userID} UNION SELECT codeLanguage FROM languageToLearn WHERE idUser = ${userID} )`
    db.query(sqlLanguages,(err,data)=>{
      if(err){
        console.error("Error getting languages:", err)
        return res.json({ success: false, message: "Internal server error" })
      }
      return res.json(data)
    })
  },

  getLanguagesLearn: (req,res)=>{ // get the languages that the user is learning if he's done learning them they become languagespeak
    const userID = req.session.userID
    const sqlLearning = `SELECT * FROM languagestolearn WHERE idUser = ${userID}`
    db.query(sqlLearning,(err,data)=>{
      if(err){
        console.error("Error getting languages:", err)
        return res.json({ success: false, message: "Internal server error" })
      }
      return res.json(data)
    })
  }
}


module.exports = languagesController
