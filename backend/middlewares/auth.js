import JwtServices from '../services/jwtServices';
import {ACCESS_JWT_TOKEN} from '../config/index';
import CustomErrorHandler from '../services/CustomErrorHandler';
export async function authMiddleware(req,res,next){
    try {
        const {accessToken}=req.cookies;
        if(!accessToken){
           return next(CustomErrorHandler.unAuthorized())
        }
        const {_id,role}= await JwtServices.verifyToken(accessToken,ACCESS_JWT_TOKEN);
        const user={_id,role};
        req.currentUser=user;
        next();
    } catch (error) {
        return next(error);
    }
}