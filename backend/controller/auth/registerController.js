/*
  1.validate the request
  2.check if user in the database already
  3.store in the database
  4.generate token and set into the cookie
  5.provide response
*/
import { User } from '../../model';
import bcrypt from 'bcrypt';
import CustomErrorHandler from '../../services/CustomErrorHandler';
import { registerSchema } from '../../validators/validators';
import { REFRESH_JWT_SECRET, ACCESS_JWT_TOKEN } from '../../config';
import JwtServices from '../../services/jwtServices';
import UserDto from '../../Dtos/userDtos';
import Jimp from 'jimp';
import path from 'path';
// api/register
const registerController = {
  async register(req, res, next) {
    try {
      const value = await registerSchema.validateAsync(req.body);
    } catch (error) {
      return next(error)
    }
    try {
      const exist = await User.exists({ email: req.body.email });
      if (exist) {
        return next(CustomErrorHandler.alreadyExist('This email is already taken.'));
      }
    } catch (error) {
      return next(error);
    }

    const { name, email, password, avatar } = req.body;

    // Image Base64
    if(avatar){
    const buffer = Buffer.from(
      avatar.replace(/^data:image\/(png|jpg|jpeg);base64,/, ''),
      'base64'
  );
    const imagePath = `${Date.now()}-${Math.round(Math.random() * 1e9)}.png`;
    // 32478362874-3242342342343432.png

    try {
      const jimResp = await Jimp.read(buffer);
      jimResp
        .resize(150, Jimp.AUTO)
        .write(path.resolve(__dirname, `../../storage/${imagePath}`));
    } catch (err) {
      return next(err)
    }
  }
    //hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // preparing model
    let user;
    try {
      user = new User({
        name,
        email,
        password: hashPassword,
        avatar:(avatar)?`/storage/${imagePath}`:null
      })
      const result = await user.save();

      //generate token
      const accessToken = JwtServices.sign({ _id: result._id, role: result.role }, '1m', ACCESS_JWT_TOKEN);
      // const refreshToken = JwtServices.sign({ _id: result._id, role: result.role }, '1y', REFRESH_JWT_SECRET);

      // store into database
      JwtServices.storeRefreshToken(next, refreshToken, result._id);

      res.cookie('accessToken', accessToken, {
        maxAge: 1000 * 60 * 60,// 1h minutes in milliseconds
        httpOnly: true,
      });
      // res.cookie('refreshToken', refreshToken, {
      //   maxAge: 1000 * 60 * 60,// 1h minutes in milliseconds
      //   httpOnly: true,
      // });
      const userDto = new UserDto(user)
      return res.status(201).json({user:userDto});
    } catch (error) {
      next(error);
    }

  }
}

export default registerController;