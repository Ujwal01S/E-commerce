import express from 'express';
import { requireSignIn, isAdmin } from '../middlewares/authMiddleware.js';
import {
    categoryController, 
    createCategoryController, 
    deleteCategoryController, 
    singleCategoryControler, 
    updateCategoryController}
     from '../controllers/categoryController.js';

const router = express.Router();


//create category routes
router.post('/create-category', requireSignIn, isAdmin, createCategoryController);

//create update routes
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController);

//create get all routes
router.get('/get-category', categoryController);

//create get single routes
router.get('/single-category/:slug', singleCategoryControler);

//delete category route
router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryController);


export default router;
