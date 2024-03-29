const db = require("../config/db")

const postInteractingController = {
    addComment : (req, res) => {
        const user = req.session.userID 
        const post = req.params.postId
        const comment = req.body.comment
        const values = [post,user,comment]
        const sqlComment = 'INSERT INTO postcomments (`idPost`,`idUser`,`comment`) VALUES ? '

        db.query(sqlComment,values,(err)=>{
            if(err){
                console.error('Error inserting comment:', err)
                return res.json({ success: false, message: "Internal server error" })
            }
            return res.json({ success: false, message: "Internal server error" })
        })
    },
      
    likePost : (req, res) => {
        const user = req.session.userID 
        const post = req.params.postId
        const values = [post,user]
        const sqlLike = 'INSERT INTO postlikes (`idPost`,`idUser`) VALUES ? '

        db.query(sqlLike,values,(err)=>{
            if(err){
                console.error('Error inserting the like:', err)
                return res.json({ success: false, message: "Internal server error" })
            }
            return res.json({ success: true, message: 'The like added successfully' })
        })
    },

    unlikePost : (req,res) =>{
        const user = req.session.userID 
        const post = req.params.postId 
        const values = [post,user]
        const sqlUnlike = 'DELETE FROM postlikes (`idPost`,`idUser`) VALUES ?'

        db.query(sqlUnlike,values,(err)=>{
            if (err){
                console.error('Error deleting the like:', err)
                return res.json({ success: false, message: "Internal server error" })
            }
            return res.json({ success: true, message: 'The like deleted successfully' })
        })
    },
   
    savePost: (req,res)=>{
        const user = req.session.userID 
        const post = req.params.postId 
        const values = [post,user]
        const sqlSave = 'INSERT INTO postsaved (`idPost`,`idUser`) VALUES ? '

        db.query(sqlSave,values,(err)=>{
            if(err){
                console.error('Error saving post:', err)
                return res.json({ success: false, message: "Internal server error" })
            }
            return res.json({ success: true, message: 'Saving added successfully' })
        })
    },

    unsavePost: (req,res)=>{
        const user = req.session.userID 
        const post = req.params.postId 
        const values = [post,user]
        const sqlSave = `DELETE FROM postsaved where idPost = ${post} and idUser = ${user} `

        db.query(sqlSave,values,(err)=>{
            if(err){
                console.error('Error unsaving post:', err)
                return res.json({ success: false, message: "Internal server error" })
            }
            return res.json({ success: true, message: 'Unsaving done successfully' })
        })
    },

    getComments : (req,res) => {
        const post = req.params.postId
        const sqlComments = `SELECT * FROM comments WHERE idPost = ${post}`

        db.query(sqlComments,(err,data)=>{
            if(err){
                console.error('Error getting comments:', err)
                return res.json({ success: false, message: "Internal server error" })
            }
            return res.json({ success: true, comments: data })
        })
    },

    getContent : (req,res) => {
        const post = req.params.postId
        const sqlPost = 'SELECT * FROM post WHERE idPost =?'

        db.query(sqlPost,[post],(err,data)=>{
            if(err){
                console.error('Error getting post:', err)
                return res.json({ success: false, message: "Internal server error" })
            }
            return res.json({ success: true, post: data })
        })
    }
    
}


module.exports = postInteractingController
