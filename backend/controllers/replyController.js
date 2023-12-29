const db = require("../config/db")

const replyController = {
    likeReply : (req,res) => {
        const user = req.session.userID 
        const reply = req.params.replyId
        const values = [reply,user]
        const sqlLike = 'INSERT INTO commentreplylikes (`idReply`,`idUser`) VALUES ? '

        db.query(sqlLike,values,(err)=>{
            if(err){
                console.error('Error inserting the like:', err)
                return res.json({ error: 'Error inserting the like' })
            }
            return res.json({ success: true, message: 'The like added successfully' })
        })
    },
    unlikeReply : (req,res) => {
        const reply = req.params.replyId
        const sqlUnlike = `DELETE FROM commentreplylikes WHERE idReply = ${reply}`

        db.query(sqlUnlike,(err)=>{
            if(err){
                console.error('Error deleting the like:', err)
                return res.json({ error: 'Error deleting the like' })
            }
            return res.json({ success: true, message: 'The like deleted successfully' })
        })
    }
}


module.exports = replyController