const express = require("express");
const router = express.Router();
const { UserModel } =  require("../src/models/user.model.js");
const mongoose = require("mongoose");

// register user
router.route("/register")
.post(async(req, res)=>{
    try{
       if(!req.body){
        throw new Error("Enter payload");
       }        
       const {name, email, password} = req.body;
       if(!name){
        throw new Error("Enter name");
       }
       if(!email){
        throw new Error("Enter email");
       }
       if(!password){
        throw new Error("Enter password");
       }
       const exitUser = await UserModel.findOne({email})
       if(exitUser){
        throw new Error("Account already exists");
       }
       const user = await UserModel.create({
        name,
        email,
        password
       })
       if(!user || !user._id){
        throw new Error("user id is not defined");
       }
       res.status(201).send({message:"User Register Successfully", token:user._id})
    }
    catch(error){
        console.log("Register Error:", error);
        res.status(400).send({error: error.message});
    }
    
})

// login user
router.route("/login")
.post(async(req, res)=>{
    try{
       if(!req.body){
        throw new Error("Enter payload");
       }        
       const {email, password} = req.body;
       if(!email){
        throw new Error("Enter email");
       }
       if(!password){
        throw new Error("Enter password");
       }
       const exitUser = await UserModel.findOne({email})
       if(!exitUser){
        throw new Error("Account does not exists");
       }
       if(!exitUser._id){
        throw new Error("user id is not defined");
       }
       if(exitUser.password !== password){
        throw new Error("Enter valid password");
       }
       res.status(200).send({message:"User Login Successfully", token:exitUser._id})
    }
    catch(error){
        console.log("Login Error:", error);
        res.status(400).send({error: error.message});
    }
    
})

// profile
router.route("/profile")
.get(async(req, res) => {
    try{
        const token = req.headers['user']
        if(!token){
            throw new Error("Login First");
        }
        if(!mongoose.isValidObjectId(token)){
            throw new Error("Enter valid ID");
        }
        const user = await UserModel.findById(token).select("-password");
        return res.status(200).send({user});
    }
    catch(error){
        res.status(400).send({error: error.message});
    }
})

module.exports = router;