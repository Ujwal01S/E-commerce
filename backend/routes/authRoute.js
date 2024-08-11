import express from 'express';
import {
   registerController, 
   loginController, 
   testController, 
   forgotPasswordController,
   updateProfileController,
   getOrderController,
   getAllOrderController,
   orderStatusController
} from '../controllers/authController.js'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
 //router object 
 const router = express.Router();

 //routing
 //REGISTER || METHOD POST
 router.post('/register', registerController);


 //LOGIN || POST METHOD

 router.post('/login', loginController);

 //Forgot password || POST method
 router.post('/forgot-password', forgotPasswordController);

 //test router for token verification 
 router.get('/test', requireSignIn, isAdmin, testController);

 //proteced user route for auth
 router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ok : true});
 });

  //proteced admin route for auth
  router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
   res.status(200).send({ok : true});
});

//update profile
router.put('/profile', requireSignIn, updateProfileController);

//order
router.get('/orders', requireSignIn, getOrderController);

//all-order
router.get('/all-orders', requireSignIn, isAdmin, getAllOrderController);

//order status update
router.put('/order-status/:orderId', requireSignIn, isAdmin, orderStatusController);

 export default router;