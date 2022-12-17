/*
  1.validate the request
  2.check if user in the database already
  3.store in the database
  4.generate token and set into the cookie
  5.provide response
*/
import Joi, { string } from 'joi';
import { User } from '../../model';
const registerController = {
  async register(req,res,next) {
    const registerSchema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
      repeat_password: Joi.ref('password'),
      avatar: Joi.string().required()
    })
    try {
      const value = await registerSchema.validateAsync(req.body);
    } catch (error) {
     return next(error)
    }
    return res.status(201).json({message:'All Right'});
  }
}

export default registerController;