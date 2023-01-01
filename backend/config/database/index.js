import mongoose from "mongoose"
const  connectDb=async(DB_URL)=>{
    try {
         await mongoose.connect(DB_URL,{dbName:'khatra'});
         console.log(' Database connected')
    } catch (error) {
        console.log(error)
    }
}
export default connectDb;