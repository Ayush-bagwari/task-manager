const jwt =  require('jsonwebtoken');
const User = require('../models/user')

const auth = async (req, res, next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ','');
     //   console.log(token);

        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({_id: decode._id, 'tokens.token':token});
        if(!user){
            throw new Error();
        }
        req.token = token;
        req.user = user;
        next();
    }catch(e){
res.status(400).send('Authentication error'); 
   }
}

module.exports = auth;