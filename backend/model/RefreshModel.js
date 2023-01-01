import mongoose, { Schema } from "mongoose";

const resfreshSchema=new mongoose.Schema({
    token:{
        type:String,
        required:true
    },
    userId:{
        type:Schema.Types.ObjectId, ref:'User'
    }
},{timestamps:true})

export default mongoose.model('RefreshModel',resfreshSchema,'tokens');