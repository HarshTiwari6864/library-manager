import express from "express";
import { mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import book_routes from "./routes/book_routes.js";
import cors from 'cors';
const PORT=9000;
const app=express();
app.use(
    cors({
        origin:"http://localhost:5173",
        methods:['GET','PUT','POST','DELETE'],
        allowedHeaders:['Content-Type'],
    })
)


app.get("/",(req,res)=>{
    res.send("working boss")
});
app.use(express.json());
app.use("/books",book_routes);



mongoose
.connect(mongoDBURL)
.then(()=>{console.log("done it")
    app.listen(PORT,()=>{
        console.log(`working on http://localhost:${PORT}`)
    });
})
.catch((error)=>{console.log({message:error.message})});