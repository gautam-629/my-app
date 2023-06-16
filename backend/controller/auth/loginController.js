import { User } from "../../model";
import CustomErrorHandler from "../../services/CustomErrorHandler";
import { loginSchema } from "../../validators/validators"
import bcrypt, { compare } from 'bcrypt'
import JwtServices from "../../services/jwtServices";
import {REFRESH_JWT_SECRET,ACCESS_JWT_TOKEN} from '../../config';
import UserDto from "../../Dtos/userDtos";
/*
 validate the request
 compare the password and email 
 generate token and set into cookie
 send the response
*/
const loginController={
   async login(req,res,next){
       try {
           const value= await loginSchema.validateAsync(req.body);
       } catch (error) {
           return next(error)
       }
       //find email
       try {
          const {email,password}=req.body;
          const user= await User.findOne({email:email})
          if(!user){
            return next(CustomErrorHandler.wrongCredentials())
          }
          // hashing password
          const match= await bcrypt.compare(password,user.password);
          if(!match){
            return next(CustomErrorHandler.wrongCredentials())
          }
          //generate jwt and set into cookie
           //generate token
        const accessToken=JwtServices.sign({_id:user._id,role:user.role},'1m',ACCESS_JWT_TOKEN);
        // const refreshToken=JwtServices.sign({_id:user._id,role:user.role},'1y',REFRESH_JWT_SECRET);


        res.cookie('accessToken', accessToken, {
          maxAge: 1000*60*60,// 1h minutes in milliseconds
          httpOnly: true,
        });
        // res.cookie('refreshToken', refreshToken, {
        //   maxAge: 1000*60*60,// 1h minutes in milliseconds
        //   httpOnly: true,
        // });
        const userDto = new UserDto(user)
        return res.status(201).json({user:userDto});
        
       } catch (error) {
           return next(error)
       }
    },

   async logout(req,res,next){
        res.clearCookie('accessToken');
        res.json({user:null});
   }
    
}

export default loginController;