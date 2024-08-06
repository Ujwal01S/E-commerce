import express from 'express';
import {requireSignIn, isAdmin} from '../middlewares/authMiddleware.js'
import formidable from 'express-formidable';
import { createProductController, deleteProductController, getProductController, getSingleProductController, productPhotoController, updateProductController } from '../controllers/productController.js';

const router = express.Router();

//routes
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController);

//get product routes
router.get('/get-product', getProductController);

//get single product
router.get('/get-product/:slug', getSingleProductController);

//get product photo
router.get('/product-photo/:pid', productPhotoController);
//delete product
router.delete('/delete-product/:pid', deleteProductController);

//update product
router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateProductController);
export default router;