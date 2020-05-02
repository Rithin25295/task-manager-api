const express = require('express')
require('./db/mongoose')
const User = require('./models/user') 
const Tasks = require('./models/tasks') 
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')


const app = express()
const port = process.env.PORT 


app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

//Listening to Port
app.listen(port, () => {
    console.log('Server is up and running on '+port+' !!!')
})



// without middleware: new request -> run route handler
//
//with middleware: new request -> do something -> run route handler
