const jwt = require("jsonwebtoken")
const {UserModel} = require("../models/user.model");

const auth = (req, res, next)=>{
    const token = req.headers.authorization?.split(" ")[1]
    if(token){
        jwt.verify(token, "rajat", (err, decoded)=>{
            if(err){
                res.status(400).send({error : err})
            }
            else{
                req.body.userID = decoded.userID
                req.body.author = decoded.author
                next()
            }
        })
    }
    else{
        res.status(400).send({
            msg : "You are not authorized"
        })
    }
}


module.exports = {
    auth
}