import Joi from 'joi';
export const registerSchema = Joi.object({

    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    repeat_password: Joi.ref('password'),
    avatar: Joi.string()
  })

  export const loginSchema=Joi.object({
    email:Joi.string().email().required(),
    password:Joi.required()
  })
  
//   review: [
//     {
//         user: { type: mongoose.Schema.ObjectId, ref: 'User' },
//         name: { type: String, required: true },
//         rating: { type: Number, required: true },
//         Comment: { type: String, required: true }
//     }
// ],

let Reviewservice = Joi.object().keys({
  user: Joi.string().required(),
  name:Joi.string().required(),
  rating:Joi.number().required(),
  Comment:Joi.string().required()
})

export const productSchema=Joi.object({
    name:Joi.string().min(4).max(100).required(),
    description:Joi.string().min(5).required(),
    price:Joi.number().required(),
    image:Joi.string().required(),
    stock:Joi.number().required(),
    seller:Joi.string().required(),
    numOfReviews:Joi.number().required(),
    user: Joi.string().required(),
    reviews:Joi.array().items(Reviewservice),
    category:Joi.string().required(),
    ratings:Joi.number()
})