const express = require("express");
const {UserModel} = require("../models/user.model");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const userRouter = express.Router();


userRouter.post("/register", (req, res)=>{
    const {username, email, pass} = req.body;
    try {
        bcrypt.hash(pass, 5, async(err, hash)=>{
            if(hash){
                const user = new UserModel({username, email, pass:hash});
                await user.save();
                res.status(200).send({
                    msg : "New user has been registered"
                })
            }else{
                res.status(400).send({msg : "error while hashing",error : err})
            }
        })
    } catch (error) {
        res.status(400).send({error : error})
    }
})

userRouter.post("/login", async(req, res)=>{
    const {email, pass} = req.body
    try {
        const user = await UserModel.findOne({email});
        bcrypt.compare(pass, user.pass, (err, result)=>{
            if(result){
                const token = jwt.sign({userID : user._id, author: user.username}, "rajat", {expiresIn : "4hr"});
                res.status(200).send({
                    msg : "Login Successfull",
                    token
                })
            }
            else{
                res.status(400).send({
                    msg : "Login unsuccessfull",
                    err
                })
            }
        })
    } catch (error) {
        res.status(400).send({error :error})
    }
})


module.exports = {
    userRouter
}