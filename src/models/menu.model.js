import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
    meal:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum: ['available', 'unavailable'],default:'available'
    },
    categorie:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,required:true
    }
})

export default mongoose.model("menu",menuSchema)