const db = require("../config/db")
const path = require("path")
const fs = require('fs')
const getUserLanguages = async (userId) => {
    const speakQuery = 'SELECT codeLanguage FROM languagespeak WHERE idUser = ?'
    const learnQuery = 'SELECT codeLanguage FROM languagetolearn WHERE idUser = ?'
  
    const [speakResult] = await db.query(speakQuery, [userId])
    const [learnResult] = await db.query(learnQuery, [userId])
  
    const spokenLanguages = speakResult.map(row => row.codeLanguage)
    const learningLanguages = learnResult.map(row => row.codeLanguage)
  
    return { spokenLanguages, learningLanguages }
}

const getPostsByLanguages = async (userId) => {
    const { spokenLanguages, learningLanguages } = await getUserLanguages(userId);
  
    const spokenPostsQuery = `
      SELECT *
      FROM post
      WHERE codeLanguage IN (?)
    `
  
    const [spokenPosts] = await db.query(spokenPostsQuery, [spokenLanguages]);

    const learningPostsQuery = `
      SELECT *
      FROM post
      WHERE codeLanguage IN (?)
    `
  
    const [learningPosts] = await db.query(learningPostsQuery, [learningLanguages]);

    const allPosts = [...spokenPosts, ...learningPosts];
  
    return allPosts;
}
 
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

    getUserPostPage: async (req, res) => {
        try {
            const userId = req.session.idUser; 
            const userLanguages = await getUserLanguages(userId); 
            const posts = await getPostsByLanguages(userLanguages);
            
            res.json(posts);

        } catch (error){
            console.error('Error fetching posts:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getUserPost: async (req, res) => {
        try {
            const userId = req.session.idUser
            const sql = 'SELECT * FROM post WHERE idUser = ? '
            const posts = await db.query(sql, [userId])

            res.json(posts)
            
        }catch (error) {
            console.error('Error fetching posts:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getPostInfo: async (req, res) => {
        try {
            const postId = req.params.idPost
            const sql = 'SELECT u.userName, u.profilePicturePath, p.title, p.description, v.CommentCount, v.LikeCount, v.SaveCount, (SELECT languageName FROM languages WHERE codeLanguage = p.codeLanguage) as language FROM users as u ,post as p ,poststats as v WHERE p.idPost = ? AND u.idUser = p.idUser AND v.idPost = p.idPost'
            const result = await db.query(sql, [postId])
            const postInfo = result[0]

            res.json(postInfo)
            
        } catch(error) {
            console.error('Error fetching post information:', error)
            res.status(500).json({ error: 'Internal Server Error' })
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
            console.error(error)
            res.status(500).json({message: ''})
        }
    }
}

module.exports = postController