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

  getLanguagestoLearn: (req,res)=>{ // get the languages that the user don't speak and didn't start learning
    const userID = req.session.userID
    const sqlLanguages = 'SELECT * FROM languages WHERE codeLanguage NOT IN ( SELECT codeLanguage FROM languagespeak WHERE idUser = ? UNION SELECT codeLanguage FROM languageToLearn WHERE idUser = ?)'
    db.query(sqlLanguages,[userID,userID],(err,data)=>{
      if(err){
        console.error("Error getting languages:", err)
        return res.json({ success: false, message: "Internal server error" })
      }
      return res.json(data)
    })
  },

  getLanguagesLearning: (req,res)=>{ // get the languages that the user is learning if he's done learning them they become languagespeak
    const userID = req.session.userID
    const sqlLearning = 'SELECT * FROM languages WHERE codeLanguage IN (SELECT codeLanguage FROM languagetolearn WHERE idUser = ?)'
    db.query(sqlLearning,[userID],(err,data)=>{
      if(err){
        console.error("Error getting languages:", err)
        return res.json({ success: false, message: "Internal server error" })
      }
      console.log('languages learning',data)
      return res.json(data)
    })
  }
}


module.exports = languagesController
