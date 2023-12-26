const express = require("express")
const cors = require("cors")
const session = require("express-session")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")

const app = express()
const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")
const postInteractingRoutes = require("./routes/postInteractingRoutes")

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
  saveUninitialized: true,
  cookie: {
    secure: false, // it was false 
    maxAge: 1000 * 60 * 60 * 24, // the session will expire in 24h
    sameSite: 'Lax'
  }
}))

app.use("/auth", authRoutes)
app.use("/user", userRoutes)
app.use("/", postInteractingRoutes)


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
