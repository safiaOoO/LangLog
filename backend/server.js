const express = require("express")
const cors = require("cors")
const session = require("express-session")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")

const app = express()
const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")
const languagesRoutes = require("./routes/languagesRoutes")
const postInteractingRoutes = require("./routes/postInteractingRoutes")
const commentRoutes = require("./routes/commentRoutes")
const replyRoutes = require('./routes/replyRoutes')


const PORT = process.env.PORT || 8081;

app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["POST", "GET"],
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));


app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false, // if it was true i will always get a cookie whenever i type anything
  cookie: {
    secure: false, // it was false 
    maxAge: 1000 * 60 * 60 * 24, // the session will expire in 24h
    sameSite: 'Lax'
  }
}))

app.use("/auth", authRoutes)
app.use("/", userRoutes)
app.use("/languages", languagesRoutes)
app.use('/posts', postInteractingRoutes)
app.use('/comments', commentRoutes);
app.use('/replies', replyRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
