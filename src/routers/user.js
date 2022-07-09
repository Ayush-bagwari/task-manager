const express = require('express');
const router = new express.Router();
const User = require('../models/user');
const auth = require('../middleware/auth');
const multer = require('multer');

router.get('/test',(req, res)=>{
    res.send('This is test');
})

router.post('/users',async (req, res)=>{
    const user = new User(req.body);
    try{
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send(user);
    }catch(e){
        res.status(400).send(e);
    }
})


// get all users
// router.get('/users',auth,async (req,res) => {
//     try{
//     const users = await User.find({});
//     res.send(users);
//     }catch(e){
//         res.status(500).send(e);
//     }

// });

router.get('/user/me',auth,async (req,res) => {
    res.send(req.user);
});

//get user by id
router.get('/user/:id',async (req,res) => {
    const _id = req.params.id;
    try{
       const user = await User.findById(_id);
       if(!user){
           return res.status(404).send();
       }
       res.send(user);
    }catch(e){
        res.status(500).send();
    }
})

router.patch('/user/me',auth,async (req,res) => {
    const id = req.user._id;
    const updates = Object.keys(req.body);
    const allowedValues = ['name','email','age','password'];
    const isValidOperation = updates.every((update) => allowedValues.includes(update));
    if(!isValidOperation){
        return res.status(400).send('Error: Invalid updates');
    }
    try{
        // const user = await User.findById(id);
        updates.forEach((update) => {
            req.user[update] = req.body[update];
        })

        await req.user.save();
      //  const user = await User.findByIdAndUpdate(id,req.body,{new:true, runValidators:true});
        res.send(req.user);
    }catch(e){
        res.send(500).send(e);
    }
})

router.delete('/user/me',auth,async (req, res) => {
    try{
        // const user = await User.findByIdAndDelete(req.user._id);
        await req.user.remove();
        res.send(req.user);
    }catch(e){
        res.status(500).send();
    }
});

router.post('/user/login', async (req, res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({ user, token});
    }catch(e){
        res.status(400).send();
    }
});

router.post('/user/logout',auth,async (req, res) => {
    try{
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });
        await req.user.save();
        res.send(req.user); 
    }catch(e){
        res.status(500).send();
    }
});

router.post('/user/logoutAll',auth ,async (req,res) => {
    try{
        req.user.tokens = [];
        await req.user.save();
        res.send(req.user);
    }catch(e){
        res.status(500).send(e);
    }
});

const upload = multer({
//    dest:'avatars',
    limit:{
        fileSize: 1000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png|PNG)$/)){
            return cb(new Error('Please upload a image file'));
        }
        cb(undefined, true);
    }
});

router.post('/user/me/avatar',auth,upload.single('avatar'),async(req, res)=>{
    req.user.avatar = req.file.buffer;
    await req.user.save();
    res.send();
},(error, req, res, next)=>{
    res.status(400).send({error: error.message});
});

module.exports = router;