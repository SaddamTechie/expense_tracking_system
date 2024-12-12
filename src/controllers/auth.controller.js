const {pool} = require('../database/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const saltRounds = 10;
const jwtSecret = process.env.JWT_SECRET;

const hashPassword = async(password) =>{
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password,salt);
        return hash;
    } catch (error) {
        console.error("Hashing error",error);
    }
}


const createToken =(user) =>{
    const token = jwt.sign({
        data:user.id
      }, jwtSecret, { expiresIn: '24h' });

    return token;
} 


const registerUser = async (req,res) =>{
    const {username,email} = req.body;
    let {password} = req.body;
    // Validate user input
    if (!username || !password || !email) {
        return res.status(400).send("All input is required");
    }
    try{
        const userExist = await pool.query("SELECT * FROM users WHERE username=$1",[username])
        if(userExist.rows.length>0){
            return res.status(400).json({'message':"Username already taken,choose another username"})
        }

        const emailExist = await pool.query("SELECT * FROM users WHERE email=$1",[email])
        if(emailExist.rows.length>0){
            return res.status(400).json({'message':"Email already exists"})
        }

        
        password = await hashPassword(password);

        const registerQuery = await pool.query("INSERT INTO users(username,email,password) VALUES ($1,$2,$3)",[username,email,password])
        if(registerQuery===0){
            return res.status(200).json({"message":"Failed to register"})
        }
        res.status(200).json({"message":"Registered successfully!"})
    }
    catch(error){
        console.error("Registering error ocurred",error);
        return res.status(500).json({"message":"Failed to register"})
    }
}

const loginUser = async (req,res) =>{
    const {username,password} = req.body;
    try {
        const userQuery = await pool.query("SELECT * FROM users WHERE username=$1",[username])
        if(userQuery.rows.length===0){
            return res.status(400).json({"message":"Invalid credentials"})
        }

        const user = userQuery.rows[0];
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({"message":"Invalid credentials"})
        }
        const token = createToken(user);
        return res.status(200).json({"message":"Login Successful","token":token})
    } catch (error) {
        console.error("Some Error occured",error)
        return res.status(500).json({"message":"Login failed"})
    }
}

module.exports = {
    loginUser,
    registerUser
}