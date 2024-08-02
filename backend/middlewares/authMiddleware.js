import JWT from 'jsonwebtoken'
import userModel from '../models/userModel.js';

export const requireSignIn = async(req, res, next) => {
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        console.log(error);
    }
};

//JWT provides verify funtion to compare token
//req is functioned and only after we find next function another conde is executed
//the token resides in request header so req.header inside header in authorization

//postman bata correction authorization ko A lai yeta capital garnu hunna 

export const isAdmin = async(req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);
        if(user.role !== 1){
            return res.send({
                success:true,
                message:'Unauthorized User only admin can add new products'
            });
        }else{
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success:false,
            error,
            message:'Error in admin middleware'
        });
    }
};