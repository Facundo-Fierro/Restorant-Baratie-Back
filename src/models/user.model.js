import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: { type: String, required: true ,trim:true},
  email: { type: String, required: true ,trim:true,unique:true},
  password: { type: String, required: true ,trim:true},
  role:{type:String,required:true, enum: ['user', 'admin'],default:'user'},
  state:{type:String,enum: ['offline', 'online'],default:'offline'}
},{
  timestamps:true
});

export default mongoose.model('User',userSchema)