import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
    meal:{
        type:String,
        required:true
    },
    available:{
        type:String,
        enum: ['Disponible', 'No disponible']
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
    },
    image:{
        type:String,
        required:true
    }
})

export default mongoose.model("menu",menuSchema)