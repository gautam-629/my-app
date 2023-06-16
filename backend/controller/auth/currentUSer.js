import User from '../../model/User';
const CurrentUserController={
     async currentUser(req,res,next){
        let user;
         try {
             user=await User.findById({_id:req.currentUser._id}).select('-password -updatedAt -__v');
         } catch (error) {
            return next(error);
         }
         
         res.status(201).json({currentUser:user})
      }
}
export default CurrentUserController;