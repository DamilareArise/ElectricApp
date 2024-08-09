const express = require('express')
const app = express()
const port = 3000
const userRouter = require('./routes/user.route')



app.use('/user', userRouter)

app.listen(port,(err)=>{
    if(err){
        console.log('There\'s an error o');
    }else{
        console.log(`Server is running on port ${port}`)
    }
})