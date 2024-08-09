import express from 'express';
import {requireSignIn, isAdmin} from '../middlewares/authMiddleware.js'
import formidable from 'express-formidable';
import { 
    createProductController, 
    deleteProductController, 
    getProductController, 
    getSingleProductController, 
    productCategoryController, 
    productCountController, 
    productFiltersController, 
    productListController, 
    productPhotoController, 
    relatedProductController, 
    searchProductController, 
    updateProductController } from '../controllers/productController.js';

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

//filter product
router.post('/product-filters', productFiltersController);

//count product
router.get('/product-count', productCountController);

//product per page
router.get('/product-list/:page', productListController);

//searchProduct
router.get('/search/:keyword', searchProductController);

//similar product
router.get('/related-product/:pid/:cid', relatedProductController);

//product by category
router.get('/product-category/:slug', productCategoryController);

export default router;