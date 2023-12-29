const db = require("../config/db")
const path = require("path")
const fs = require('fs')
 
const postController = {
    createPost: async (req, res) => {
        try {
            const sql = "INSERT INTO post (title, description, content, picturePath, category, codeLanguage, idUser) VALUES (?, ?, ?, ?, ?, ?, ?)"
            let picturePath
    
            if (req.file) {
                // in case the user adds a picture 
                const image = `${Date.now()}-${req.file.originalname}`
                picturePath = path.join(__dirname, "../public/postPictures", image)
                await fs.promises.writeFile(picturePath, req.file.buffer)
            }
    
            const { title, description, content, category, codeLanguage } = req.body
            console.log('the title is: ', title, 'the description is: ', description, 'the content is: ', content, 'the category is : ', category, ' the codelanguage is: ', codeLanguage)
            const userId = req.session.userId
            console.log('userId: ', userId)
    
            const result = await db.query(sql, [title, description, content, picturePath, category, codeLanguage, userId])
            
            const response = {
                affectedRows: result.affectedRows,
                insertId: result.insertId,
                message: 'Post added successfully'
            }
            res.status(201).json(response)
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'failed to add the post' })
        }
    },
    

    deletePost: async (req, res) => {
        try { 
            const sql = "DELETE FROM post WHERE idPost = ?"
            const postId = req.params.idPost;
            const result = await db.query(sql, [postId])

            if (result.affectedRows === 0 ) {
                return res.status(404).json({error : 'post not found'})
            }

            res.json({message: 'post deleted successfully'})

        } catch (error) {
            console.error(error)
            res.status(500).json({error: 'failed to delete the post'})
        }
    },

    editPost: async (req, res) => {
        try {
            const sql = `UPDATE post 
                         SET title = ?, description = ? , category = ?, codeLanguage = ?
                         WHERE idPost = ? `
            const postId = req.params.idPost 
            const {title, description, content, category, languageName} = req.body
            const codeLanguage = await getLanguageCode(languageName)
            const result = await db.query(sql, [title, description, content, category, codeLanguage, postId])

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Post not found' })
            }

            res.json({message: 'Post updated successfully' })

        } catch (error){
            console.error(error)
            res.status(500).json({error: 'Failed to edit the post'})
        }
    },

    getUserPosts: async (req, res) => {
        try {
            const userId = req.session.idUser
            const sql = 'SELECT * FROM post WHERE idPost = ?'
            const result = await db.query(sql, [userId]) 

            const response = {
                affectedRows: result.affectedRows,
                insertId: result.insertId,
                message: 'Posts retrieved successfully'
            }
            res.status(201).json (response)
        } catch (error){
            console.log(error)
            res.status(500).json({message : 'Retrieve Failed'})
        }
    },

    getPosts: async (req, res) => {
        try {
            const sql = 'SELECT * FROM post ORDER BY RAND() LIMIT 100'
            const result = await db.query(sql)

            const response = {
                affectedRows: result.affectedRows,
                insertId: result.insertId,
                message: 'Posts retrieved successfully'
            }
            res.status(201).json (response)
        } catch(error) {
            console.log(error)
            res.status(500).json({message : ''})
        }
    }, 

    searchByFilter: async (req, res) => {
        try {
            const filter = req.body.filter
            const sql = 'SELECT * FROM post WHERE codeLanguage = ?'
            const result = await db.query(sql, [filter])

            const response = {
                affectedRows: result.affectedRows,
                insertId: result.insertId,
                message: 'Search Posts retrieved successfully'
            }
            res.status(201).json (response)
        }catch(error) {
            console.log(error)
            res.status(500).json({message: ''})
        }
    },

    getpost : async (req, res) => {
        try{

        }catch(error) {

        }
    }
}

module.exports = postController