const User = require("../models/User")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");

const registerUser = async(req,res) =>{
    try {
        const {name,email,password} = req.body;

        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({message:"User already exists"});
        }

        user = new User({name,email,password});
        await user.save();

        res.status(201).json({message:"User registered Successfully"});
    } catch (error) {
        res.status(500).json({message: "Error registering user",error});
    }
}

const loginUser = async (req,res) => {
    try {
        const {email,password} = req.body;

        const user = User.findOne({email});
        if(!user){
            return res.status(404).json({message : "Invalid emailId"});
        }
        const isMatch = bcrypt.compare(user.password,password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid password"});
        }

        const token = jwt.sign({userId : user._id},process.env.JWT_SECRET,{expiresIn:"1h"});

        res.status(200).json({token, user:{id:user._id, username: user.name,email:user.email}});
    } catch (error) {
        res.status(500).json({message:"Error logging in user",error});
    }
}

module.exports = {registerUser,loginUser}