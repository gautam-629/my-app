import express from 'express'
let router=express.Router();
import { ProductController } from '../controller';
import {authMiddleware} from '../middlewares/auth';
import {adminMiddleware} from '../middlewares/admin'
router.post('/createproduct/admin',[authMiddleware,adminMiddleware],ProductController.createProduct);
router.get('/getallproducts',ProductController.getAllProducts);
router.get('/getsingleproduct/:id',ProductController.getSingleProduct);
router.delete('/deletesingleproduct/admin/:id',[authMiddleware,adminMiddleware],ProductController.deleteSingleProduct);
router.put('/updatesingleproduct/admin/:id',[authMiddleware,adminMiddleware],ProductController.updateSingleProduct);
export default router;