const db = require("../config/db")

const commentController = {
    likeComment : (req,res) => {
        const user = req.session.userID 
        const comment = req.params.commentId
        const values = [comment,user]
        const sqlLike = 'INSERT INTO commentlikes (`idComment`,`idUser`) VALUES ? '

        db.query(sqlLike,values,(err)=>{
            if(err){
                console.error('Error inserting the like:', err)
                return res.json({ error: 'Error inserting the like' })
            }
            return res.json({ success: true, message: 'The like added successfully' })
        })
    },

    unlikeComment : (req,res) => {
        const comment = req.params.commentId
        const sqlUnlike = `DELETE FROM commentlikes WHERE idComment = ${comment}`

        db.query(sqlUnlike,(err)=>{
            if(err){
                console.error('Error deleting the like:', err)
                return res.json({ error: 'Error deleting the like' })
            }
            return res.json({ success: true, message: 'The like deleted successfully' })
        })
    },

    replyToComment : (req,res) => {
        const user = req.session.userID 
        const comment = req.params.commentId
        const reply = req.body.reply
        const values = [comment,user,reply]
        const sqlReply = 'INSERT INTO replytocomment (`idComment`,`idUser`,`replyText`) VALUES ? '

        db.query(sqlReply,values,(err)=>{
            if(err){
                console.error('Error inserting reply:', err)
                return res.json({ error: 'Error inserting reply' })
            }
            return res.json({ success: true, message: 'Reply added successfully' })
        })
    },

    getRepliesForComment : (req,res) => {
        const comment = req.params.commentId
        const sqlReplies = `SELECT * FROM replytocomment WHERE idComment = ${comment}`

        db.query(sqlReplies,(err,data)=>{
            if(err){
                console.error('Error deleting the like:', err)
                return res.json({ error: 'Error deleting the like' })
            }
            return res.json({ success: true, replies : data })
        })
    }
}


module.exports = commentController
