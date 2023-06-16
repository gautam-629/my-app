import { User } from "../model";
import CustomErrorHandler from "../services/CustomErrorHandler";

export async function adminMiddleware(req,res,next){
        try {
            const user= await User.findById({_id:req.currentUser._id})
            if(!user.role==='admin'){
                return next(CustomErrorHandler.unAuthorized("Only admin allow to access"))
            }
            next();
        } catch (error) {
            return next(error);
        }
}