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
  }
}


module.exports = languagesController
