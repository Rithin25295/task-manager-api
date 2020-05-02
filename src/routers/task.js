const express = require('express')
const Tasks = require('../models/tasks')
const auth = require('../middleware/auth')
const router =  new express.Router() 

//Create a Task
router.post('/tasks',auth, async (req, res) => {
    // const task = new Tasks(req.body) 
    const task = new Tasks({
        ...req.body,
        owner: req.user._id
    })
    try{
        await task.save()
        res.status(201).send(task) 

    }catch (e) {
        res.status(500).send(e)

    }
})

//Get All Tasks?completed=true
//Get /tasks?limit=10&skip=20
router.get('/tasks', auth, async (req, res) => {
    
    const match = {}
    const sort = {}
    
    if(req.query.completed){
        match.completed = req.query.completed === 'true' 
    }

    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }
    
    try{
        // const tasks = await Tasks.find({owner: req.user._id})
        await req.user.populate({ 
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
    }).execPopulate()
        res.send(req.user.tasks)

    }catch (e) {
        res.status(500).send(e)
    }
})
//Get Task by Id
router.get('/tasks/:id', async (req, res) => {
    
    const task = await Tasks.findOne({_id: req.params.id,owner: req.user._id})

    try{
        if(!task){
            return res.status(400).send()
        }
        res.send(task)
    }catch (e) {
        res.status(500).send(e)
    }
})
//Update Task by Id
router.patch('/tasks/:id', auth, async (req, res) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ['description','completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if(!isValidOperation){
        return res.status(400).send('error: Invalid Updates!')
    }

    try{

        const task = await Tasks.findOne({_id: req.params.id,owner: req.user._id})
        if(!task){
            return res.status(404).send()
        }
        updates.forEach((update) => task[upadte] = task.body[update])
        await task.save()
        res.send(task)
    }catch (e) {
        res.status(400).send(e)
    }
})

//Delete the Task by ID
router.delete('/tasks/:id',auth, async (req,res) => {

    try{
        const task = await Tasks.findByIdAndDelete({_id: req.params._id,owner:req.user._id})

        if(!task){
            res.status(400).send()
        }
        res.send(task)
    }catch (e) {
        res.status(404).send(e)
    }
})

module.exports = router