const mongoose = require('mongoose');
// mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api');
// const validator = require('validator');

const taskSchema = new mongoose.Schema({
    description:{
        type: String,
        required: true,
        trim: true
    },
    completed:{
        type: Boolean,
        default: false
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
},{
    timestamps: true
});


const Task = mongoose.model('Task',taskSchema);

module.exports = Task;