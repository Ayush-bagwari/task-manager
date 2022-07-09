const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
const jwt = require('jsonwebtoken');
const app = express();
const port = process.env.PORT;

// app.use((req, res, next) => {
//     console.log(req.method);
//     if(req.method === 'GET'){
//         res.send('Get reuests ar disbaled');
//     }else{
//         next();
//     }
// })

app.use(express.json());

app.use(userRouter);
app.use(taskRouter);


// app.post('/user/add',async (req,res) => {
//     const user = new User(req.body);
//     try{
//         await user.save();
//         res.status(201).send(user);
//     }catch(e){
//         res.status(500).send(e);
//     }

// })


// const myfunction = async () =>{
//     const token = jwt.sign({_id:"Ayush27y"}, 'thisismypractice',{expiresIn:'7 days'});
//     console.log(token);
//     const data = jwt.verify(token,'thisismypractice');
//     console.log(data);
// }
// myfunction();


app.listen(port, ()=>{
    console.log('Server is running on port'+ port);
})

// const bcrypt = require('bcrypt');

// const myFunction = async () => {
//     const password = 'Red12345';
//     const hashedPassword = await bcrypt.hash(password, 8);
//  //   console.log(hashedPassword);
//     const isMatch = await bcrypt.compare(password, hashedPassword);
//      console.log(isMatch);
// }

// myFunction();

// const Task = require('./models/task');
// const User = require('./models/user')
// const main = async() => {
// //    const task = await Task.findById('62b08e52e179b1bc4ccb0509');
// //    await task.populate('owner');
// //    console.log(task.owner);
// const user = await User.findById('62b089878f9674ecb4ef0323');
// await user.populate('tasks');
// console.log(user.tasks);
// }
// main();

// const multer = require('multer');
// const upload = multer({
//     dest:'images',
//     limit:{
//         fileSize: 1000000
//     }
// });

// app.post('/upload',upload.single('upload'),(req,res)=> {
//     res.send();
// })