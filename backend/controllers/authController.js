
import {comparePassword, hashPassword } from '../helpers/authHelper.js';
import orderModel from '../models/orderModel.js';
import userModel from "../models/userModel.js";
import JWT from 'jsonwebtoken';

export const registerController = async(req, res) => {
    try {
        const {name, email, password, phone, address, answer} = req.body;
        if(!name) {
            return res.send({message: 'Name is required'})
        }
        if(!email) {
            return res.send({message: 'Email is required'})
        }
        if(!password) {
            return res.send({message: 'Password is required'})
        }
        if(!phone) {
            return res.send({message: 'Phone is required'})
        }
        if(!address) {
            return res.send({message: 'Address is required'})
        }
        if(!answer) {
            return res.send({message: 'Answer is required'})
        }

        //check existing user
        const existingUser = await userModel.findOne({email:email });
        //existing user
        if(existingUser){
            return res.status(200).send({
                success:false,
                message:'Already Register please login',
            })
        }
        //register user
        const hashedPassword = await hashPassword(password);
        //save
        const user = await new userModel({name, email, phone, address, password:hashedPassword, answer}).save();
        res.status(201).send({
            success: true,
            message:'User Registered Successfully',
            user,

        });
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in Registration',
            error,
        });
    }
};  //this is callback function

export const loginController = async (req, res)=> {
    try {
        const {email, password} = req.body;
        //validation
        if(!email || !password){
            res.status(400).send({
                success:false,
                message:"Invalid email or password"
            })
        }
        //check user
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success: false,
                message:'email not registered'
            });
        }
        const match = await comparePassword(password, user.password);
        if(!match){
            return res.status(200).send({
                success:false,
                message:'Invalid password'
            });
        }
        //token
        const token = await JWT.sign({_id:user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});
        res.status(200).send({
            success:true,
            message:'login successfully',
            user:{
                _id:user._id,
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
                role:user.role,
            },
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message:'Error in login',
            error
        });
    }
};

//forgotpassowrd controller
export const forgotPasswordController = async(req, res) => {
    try {
        const {email, answer, newPassword} = req.body;
        if(!email){
            res.send({message : 'email is required'});
        }
        if(!answer){
            res.send({message: 'answer is required'});
        }
        if(!newPassword){
            res.send({message: 'newPassword is required'});
        }
        //check
        const user = await userModel.findOne({email, answer});
        //validation
        if(!user){
            res.status(500).send({
                success: false,
                message: 'Wrong email or answer'
            });
        }
        const hashed = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id, {password: hashed});
        res.status(200).send({
            success: true,
            message: 'Password reset successfully'
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Something went wrong',
            error
        });
    }

};



//test controller
export const testController = (req, res) => {
    res.send('protected cracked with token');
};

//update profile controller

export const updateProfileController = async(req, res) => {
    try {
        const {name, email, password, address, phone} = req.body;
        //request.body vitra dherai chij cha jastai uta user ko from bata patha ko info cha ra user vitra id cha
        const user = await userModel.findById(req.user._id);
        //password
        if (password && password.length < 6){
            return res.json({error: 'password is required and 6 char long'});
        }
        const hashedPassword = password ? hashPassword(password) : undefined;
        const updatedUser = await userModel.findByIdAndUpdate(req.user._id, {
            name: name || user.name,
            email: email || user.email,
            password: hashedPassword || user.password,
            address: address || user.address,
            phone : phone || user.phone,
        } ,{new: true});
        res.status(200).send({
            success : true,
            message : 'Profile Updated Successfully',
            updatedUser,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: 'Error while updating profile',
            error,
        });
    }
};

//orders
export const getOrderController = async(req, res) => {
    try {
        const orders = await orderModel.find
        ({buyer: req.user._id}).populate('products', '-photo').populate('buyer', 'name');
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message:'Error while getting order',
            error,
        });
    }
};

//get all orders
export const getAllOrderController = async(req, res) => {
    try {
        const orders = await orderModel.find({})
        .populate('products', '-photo')
        .populate('buyer', 'name')
        .sort({ createdAt: -1});
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message:'Error while getting order',
            error,
        });
    }
};

//update orde status

export const orderStatusController = async(req, res) => {
    try {
        const { orderId } = req.params;
        const {status} = req.body;
        const orders = await orderModel.findByIdAndUpdate(
            orderId,
            { status },
            {new: true}
        );
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while getting order status',
            error
        });
    }
};