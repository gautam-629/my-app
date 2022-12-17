import express from 'express'
let router=express.Router();
import { registerController } from '../controller';
router.post('/register',registerController.register)

export default router;