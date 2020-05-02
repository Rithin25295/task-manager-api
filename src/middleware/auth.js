const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Tasks = require('../models/tasks')


const auth = async (req,res,next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ','')
        const decoded = jwt.verify(token,process.env.TOKEN_SECRET)
        const user = await User.findOne({_id: decoded._id,'tokens.token':token})
        const task = await Tasks.findById(Tasks._id)

        if(!user){
            throw new Error()
        }
        req.token = token
        req.user = user

        next()
    }catch (e) {
        res.status(401).send({error: 'Please authenticate'})

    }
}

module.exports=auth