const express = require("express");
const {NoteModel} = require("../models/note.model")
const {auth} = require("../middlewares/auth.middleware");

const noteRouter = express.Router();


noteRouter.post("/create", auth, async(req, res)=>{
    try {
        const note = new NoteModel(req.body)
        await note.save()
        res.status(200).send({
            msg : "New note has been added"
        })
    } catch (error) {
        
    }
})


noteRouter.get("/read", auth, async(req, res)=>{
    try {
        const notes = await NoteModel.find({userID:req.body.userID})
        res.status(200).send({notes});
    } catch (error) {
        res.status(400).send({error : error})
    }
})

noteRouter.patch("/update/:noteID", auth, async(req, res)=>{
    const {noteID} = req.params;
    try {
        // userID present in node === userID in the req.body
        const note = await NoteModel.findOne({_id:noteID})
        if(note.userID === req.body.userID){
            await NoteModel.findByIdAndUpdate({_id:noteID}, req.body)
            res.status(200).send({msg : `the note with id ${noteID} has been updated`})
        }else {
            res.status(400).send({msg : "You are not authorized"})
        }
    } catch (error) {
        res.send({error : error})        
    }
})

noteRouter.delete("/delete/:noteID", auth, async(req, res)=>{
    const {noteID} = req.params;
    try {
        // userID present in node === userID in the req.body
        const note = await NoteModel.findOne({_id:noteID})
        if(note.userID === req.body.userID){
            await NoteModel.findByIdAndDelete({_id:noteID})
            res.status(200).send({msg : `the note with id ${noteID} has been deleted`})
        }else {
            res.status(400).send({msg : "You are not authorized"})
        }
    } catch (error) {
        res.send({error : error})        
    }
})



module.exports = {
    noteRouter
}