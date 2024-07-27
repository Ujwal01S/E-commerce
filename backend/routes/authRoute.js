import express from 'express';
import {registerController, loginController, testController} from '../controllers/authController.js'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
 //router object 
 const router = express.Router();

 //routing
 //REGISTER || METHOD POST
 router.post('/register', registerController);


 //LOGIN || POST METHOD

 router.post('/login', loginController);

 //test router for token verification 
 router.get('/test', requireSignIn, isAdmin, testController);

 export default router;