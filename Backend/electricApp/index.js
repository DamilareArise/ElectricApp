const express = require('express')
const app = express()
const port = 5000
const userRouter = require('./routes/user.route')
const mongoose = require("mongoose")
require('dotenv').config()
const cors = require("cors")

app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(express.json())

let URI = process.env.MONGO_DB_URI
mongoose.connect(URI)
.then(()=>{
    console.log('mongoDB connected')
})
.catch(()=>{
    console.log('mongoDB connection failed')
})

app.use('/account', userRouter)

app.get('/', (req,res) =>{
    res.send('Hello World')
})

app.listen(port,(err)=>{
    if(err){
        console.log('There\'s an error o');
    }else{
        console.log(`Server is running on port ${port}`)
    }
})