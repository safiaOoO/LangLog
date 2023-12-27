const db = require("../config/db")

const languagesController = {
  getLanguages: (req, res) => {
    const sql = 'SELECT * FROM languages'
    
    db.query(sql,(err,data)=>{
      if(err){
        console.error("Error saving getting languages:", err)
        return res.json({ error: "Error getting languages" })
      }
      console.log(data)
      return res.json(data)
    })
  }
}


module.exports = languagesController
