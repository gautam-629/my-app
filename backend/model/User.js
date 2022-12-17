import mongoose from 'mongoose'

const userSchema=new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String,required:true},
    avatar:{type:String,required:true},
    role:{type:String, default:'user'}
},{timestamps:true});

export default mongoose.model('User',userSchema,'users');