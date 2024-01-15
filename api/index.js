const express = require('express')
const mongoose= require('mongoose')
const dotenv= require('dotenv')
const cors = require('cors')
const path = require("path")
const authRouter = require("./routers/auth")
const userRouter = require('./routers/user')
const postRouter = require('./routers/post')
const commentRouter = require('./routers/comment')

const app = express();
const port= process.env.PORT || 5000
dotenv.config();
mongoose.set('strictQuery', false)

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Mongodb Connected'))
.catch((err)=> console.log(err))

////Middlewere Function

app.use(express.json({limit:'50mb'}))
app.use(express.urlencoded({extended: true, limit:'50mb'}))
app.use(express.static(path.join(__dirname, 'build')));
app.use(cors())

app.get('/', async(req,res) => {
    res.status(200).json({message :"Successfully Conected"})
})

app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)
app.use('/api/posts', postRouter )
app.use('/api/comments', commentRouter)


app.listen(port, () => console.log(`Server Running on Port: http://localhost:${port}`))
