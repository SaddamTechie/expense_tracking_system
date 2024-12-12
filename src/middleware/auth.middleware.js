const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET;

const validate = (req,res,next) =>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(!token){
        return res.status(403).json({"message":"Unauthorized"});
    }
    try {
        jwt.verify(token,jwtSecret,(err,user)=>{
            if(err){
                return res.status(403).json({"message":"Invalid token"})
            }
            req.user = user.data;
            next();
        })

      } catch(err) {
        console.error('Error occured',err)
        return res.status(500).json({"message":"failed to validate token"})
      }
}


module.exports = validate;

