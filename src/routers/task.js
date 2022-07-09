const express = require('express');
const router = new express.Router();
const Task = require('../models/task');
const auth = require('../middleware/auth'); 
router.get('/test1',(req, res)=>{
    res.send('This is test1');
})

//creating  a task
router.post('/tasks',auth,async (req,res)=>{
   // const task = new Task(req.body);
   const task = new Task({
    ...req.body,
    owner: req.user._id
   });
    try{
        await task.save();
        res.status(201).send(task);
    }catch(e){
        res.status(400).send(e);
    }
});


// get all tasks
// get /task?limit=1
// get /task?completed=true
router.get('/tasks',auth,async (req, res) => {
    try{
        const match = {}
        if(req.query.completed){
            match.completed = req.query.completed === 'true';
        }
        const value = req.query.completed;
    // const tasks = await Task.find({owner: req.user._id});
    await req.user.populate({
        path:'tasks',
        match,
        options:{
            limit:parseInt(req.query.limit),
            skip:parseInt(req.query.skip),
            sort:{
                createdAt: 1
            }
        }
    });
    res.send(req.user.tasks);
    }catch(e){
        res.send(e);
    }
})
// get task by id
router.get('/task/:id',auth,async (req,res)=> {
  const _id = req.params.id;
  try{
    // const task = await Task.findById(id);
    const task = await Task.findOne({_id, owner: req.user._id});
    if(!task){
    return res.status(404).send();
    }
    res.send(task);
  }catch(e){
      res.status(500).send();
  }  
})


router.patch('/task/:id',auth,async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedValues = ['description','completed'];
    const isValidOperation = updates.every((update) => allowedValues.includes(update));;
    if(!isValidOperation){
        return res.status(400).send('Error: Invalid Updates');
    }
    try{
        const task = await Task.findOne({_id:req.params.id,owner:req.user._id})
        // const task = await Task.findById(req.params.id);
    
        // const task = await Task.findByIdAndUpdate(req.params.id,req.body,{new:true, runValidators:true});
        
        if(!task){
           return res.status(404).send();
        }
        updates.forEach((update) => {
            task[update] = req.body[update];
        })
        await task.save();

        res.send(task);
    }catch(e){
        res.status(500).send(e);
    }
})



router.delete('/task/:id',auth,async (req, res) => {
    try{
        const task = await Task.findOneAndDelete({_id:req.params.id, owner:req.user._id});
        if(!task){
            return res.status(404).send();
        }
        res.send(task);
    }catch(e){
        res.status(500).send();
    }
})

module.exports = router;