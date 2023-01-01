
import jwt from 'jsonwebtoken'
import RefreshModel from '../model/RefreshModel';

class JwtServices{
    static sign(payload,expiry='1y',secret){
       return jwt.sign(payload,secret,{expiresIn:expiry})
    }
    static verify(token,secret){
        return jwt.verify(token,secret)
    }
    static async storeRefreshToken(next,token,userId){
        try {
            await RefreshModel.create({
               token:token,
               userId:userId
            })
        } catch (error) {
            return next(error);
        }
    }
}
export default JwtServices;