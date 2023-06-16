import mongoose from 'mongoose';
const userSchema=new mongoose.Schema({
    name:{type:String, trim:true, required:true},
    email:{type:String, required:true},
    password:{type:String,required:true},
    avatar:{type:String,required:false},
    role:{type:String, default:'user'}
},{timestamps:true});

export default mongoose.model('User',userSchema,'users');