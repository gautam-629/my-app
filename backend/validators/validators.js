import Joi from 'joi';
export const registerSchema = Joi.object({

    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    repeat_password: Joi.ref('password'),
    avatar: Joi.string().required()
  })

  export const loginSchema=Joi.object({
    email:Joi.string().email().required(),
    password:Joi.required()
  })