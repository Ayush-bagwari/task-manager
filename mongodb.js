const {MongoClient, ObjectID} = require('mongodb');
// const MongoClient = mongodb.MongoClient;

const connectionUrl = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';
MongoClient.connect(connectionUrl, {useNewUrlParser: true}, (error, client) => {
if(error){
    console.log('Connection failed');
}
console.log("connected successfully");
const db = client.db(databaseName);
// db.collection('users').insertOne({
//     name:'ayush',
//     age: 28
// },(error, result)=>{
//     if(error){
//         console.log("Unable to insert user");
//     }
//     console.log(result);
// });
// db.collection('users').findOne({age:24},(error, result)=>{
//     if(error){
//         console.log('unable to fetch');
//     }
//     console.log(result);
// })

db.collection('users').updateOne({
    _id: new ObjectID('628d98f003a2b2eba0892f7a')
},{
    $inc:{
        age : -1
    }
}).then((result)=>{
    console.log(result);
}).catch((error)=>{
    console.log(error);
})
});