import express from 'express'
let router=express.Router();
import { registerController ,loginController} from '../controller';
router.post('/register',registerController.register)
router.post('/login',loginController.login)
export default router;