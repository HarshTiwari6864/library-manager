import mongoose from "mongoose";
const Bookschema=mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    author:{
        type :String,
        required:true,
    },
    publishyear:{
        type :Number,
        required:true,
    },
    
},
{
    timestamp:true
})
export const Book=mongoose.model('Book',Bookschema)