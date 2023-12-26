const db = require("../config/db")

const postInteractingController = {
    postComment : (req,res) => {
        const user = req.session.id 
        const post = req.body.postID // safia has to put the postID as a name in one of the input of
        const comment = req.body.comment
        const values = [post,user,comment]
        const sqlComment = 'INSERT INTO postcomments (`idPost`,`idUser`,`comment`) VALUES ? '

        db.query(sqlComment,values,(err)=>{
            if(err){
                console.error('Error inserting comment:', err)
                return res.json({ error: 'Error inserting comment' })
            }
            return res.json({ success: true, message: 'Comment added successfully' })
        })
    },

    postLike : (req,res) => {
        const user = req.session.id 
        const post = req.body.postID
        const values = [post,user]
        const sqlLike = 'INSERT INTO postlikes (`idPost`,`idUser`) VALUES ? '

        db.query(sqlLike,values,(err)=>{
            if(err){
                console.error('Error inserting the like:', err)
                return res.json({ error: 'Error inserting the like' })
            }
            return res.json({ success: true, message: 'The like added successfully' })
        })
    },

    replyComment : (req,res) => {
        const user = req.session.id 
        const comment = req.body.commentID
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

    commentLike : (req,res) => {
        const user = req.session.id 
        const comment = req.body.commentID // the name of the comments needs to be commentID and it's value needs to be the id of the comment
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

    replyLike : (req,res) => {
        const user = req.session.id 
        const reply = req.body.replyID // the name of the replies needs to be replyID and it's value needs to be the id of the reply
        const values = [reply,user]
        const sqlLike = 'INSERT INTO commentlikes (`idReply`,`idUser`) VALUES ? '

        db.query(sqlLike,values,(err)=>{
            if(err){
                console.error('Error inserting the like:', err)
                return res.json({ error: 'Error inserting the like' })
            }
            return res.json({ success: true, message: 'The like added successfully' })
        })
    },

    savePost: (req,res)=>{
        const user = req.session.id 
        const post = req.body.postID // safia has to put the postID as a name in one of the input of
        const values = [post,user]
        const sqlSave = 'INSERT INTO postsaved (`idPost`,`idUser`) VALUES ? '

        db.query(sqlSave,values,(err)=>{
            if(err){
                console.error('Error saving post:', err)
                return res.json({ error: 'Error saving post' })
            }
            return res.json({ success: true, message: 'Saving added successfully' })
        })
    },

    unsavePost: (req,res)=>{
        const user = req.session.id 
        const post = req.body.postID // safia has to put the postID as a name in one of the input of
        const values = [post,user]
        const sqlSave = `DELETE FROM postsaved where idPost = ${post} and idUser = ${user} `

        db.query(sqlSave,values,(err)=>{
            if(err){
                console.error('Error unsaving post:', err)
                return res.json({ error: 'Error unsaving post' })
            }
            return res.json({ success: true, message: 'Unsaving done successfully' })
        })
    }

}

module.exports = postInteractingController