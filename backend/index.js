const express = require("express");
require("dotenv").config();
const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.routes");
const { noteRouter } = require("./routes/note.routes");
const { cors } = require("cors");

const app = express();
app.use(express.json());

app.use("/users", userRouter);
app.use("/notes", noteRouter);
app.use(cors);


app.get("/", (req, res)=>{
    res.status(200).send({msg : "This is the home page"});
})

app.listen(process.env.port, async()=>{
    try {
        await connection
        console.log("Db is connected");
        console.log(`Server is running on port ${process.env.port}`)
    } catch (error) {
        console.log(error)
    }
    
})