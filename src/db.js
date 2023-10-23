import mongoose from "mongoose"

export const  connectDB = async () =>{
    try {
       await  mongoose.connect('mongodb://localhost/baratie')
       console.log('db connected')
    } catch (error) {
        console.log(error)
    }}