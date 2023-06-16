import express from 'express'
let router=express.Router();
import {authMiddleware} from '../middlewares/auth'
import { registerController ,loginController, CurrentUserController} from '../controller';
router.post('/register',registerController.register);
router.post('/login',loginController.login);
router.get('/logout',loginController.logout);
router.get('/currentuser',authMiddleware,CurrentUserController.currentUser)
export default router;