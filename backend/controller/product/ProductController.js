import ProductModel from "../../model/ProductModel";
import CustomErrorHandler from "../../services/CustomErrorHandler";
import { productSchema } from "../../validators/validators";

const ProductController={
    // api/createproduct/admin
   async createProduct(req,res,next){
       // validate the request
       try {
        const value= await productSchema.validateAsync(req.body)
       } catch (error) {
         return next(error);
       }
       // inset into database
       let product;
       try {
         product= await ProductModel.create(req.body);
       } catch (error) {
            return next(error);
       }
       res.status(201).json({product:product})
    },
    
    //api/getallproducts
   async getAllProducts( req,res,next){
    let products;
       try {
           products=await ProductModel.find();
       } catch (error) {
           return next(error);
       }
        res.status(201).json({products:products})
   },
  //api/getsingleproduct
 async  getSingleProduct(req,res,next){
        let product;
        try {
          product=await ProductModel.findById(req.params.id);
          if(!product){
            return next(CustomErrorHandler.productNotFound());
          }
        } catch (error) {
          return next(error);
        }
        res.status(201).json({product:product})
   },
  // deletesingleproduct/admin
   async  deleteSingleProduct(req,res,next){
    let product;
    try {
      product=await ProductModel.findByIdAndDelete(req.params.id);
      if(!product){
        return next(CustomErrorHandler.productNotFound());
      }
    } catch (error) {
      return next(error);
    }
    res.status(201).json({product:product})
},
// deletesingleproduct/admin
async  updateSingleProduct(req,res,next){
  let product;
  try {
    product=await ProductModel.findByIdAndUpdate(req.params.id,req.body);
    if(!product){
      return next(CustomErrorHandler.productNotFound());
    }
  } catch (error) {
    return next(error);
  }
  res.status(201).json({product:product})
}

}
export default ProductController;