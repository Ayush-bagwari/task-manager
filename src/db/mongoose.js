const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URL);
// const validator = require('validator');

// const Task = mongoose.model('Task',{
//     description:{
//         type: String,
//         required: true,
//         trim: true
//     },
//     completed:{
//         type: Boolean,
//         default: false
//     } 
// });

// const temp = new Task({
//     description: 'New to mongoose',
//     completed: false
// });

// temp.save().then(()=>{
//     console.log(temp);
// }).catch((error)=>{
//     console.log(error);
// })

