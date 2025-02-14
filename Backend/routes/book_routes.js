import express from 'express';
import { Book } from '../models/Booksmodel.js';
const router = express.Router();
router.post("/",async(req,res)=>{
    try {
        if (!req.body.title||!req.body.author||!req.body.publishyear) {
            res.send({message: "sab o bhej"})
        }
    const newbook={
            title:req.body.title,
            author:req.body.author,
            publishyear:req.body.publishyear,
        };
        const book =await Book.create(newbook);
        res.send(book);}
        
    catch (error) {
        console.log(error.message);
        res.send({message: error.message})
    }
})
router.get("/",async (req,res)=>{
    try {
        const books = await Book.find({});
        res.send({
            count:books.length,
            data:books
        });
    } catch (error) {
        console.log(error);
        res.send({message:error.message});
    }
})
router.get("/:id",async (req,res)=>{
    try {
        const {id}=req.params;
        const books = await Book.findById(id);
        res.send({books});
    } catch (error) {
        console.log(error);
        res.send({message:error.message});
    }
})
router.put("/:id",async(req,res)=>{
    try {
        if (!req.body.title||!req.body.author||!req.body.publishyear) {
            res.send({message: "sab o bhej"})
        }
        const {id}=req.params;
        const result =await Book.findByIdAndUpdate(id,req.body);
        if(!result){
            res.send({message:"nahi mili"});
        }
        else{
        res.send({message:"mil gyi kr diya kam"})}
        
    } catch (error) {
        console.log(error.message);
        res.send({message: error.message});
    }
})
router.delete("/:id",async(req,res)=>{
    try {
        const {id}=req.params;
        const result = await Book.findByIdAndDelete(id);
        if(!result){
            res.send({message:"nahi mili"});
        }else{
        res.send({message:"mil gyi kr diya kam"})}

    } catch (error) {
        console.log(error.message);
        res.send({message: error.message});
    }
})
export default router;