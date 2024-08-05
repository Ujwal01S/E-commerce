import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

//create category controller
export const createCategoryController = async(req, res) => {
    try {
        const {name} = req.body;
        if(!name){
            res.status(401).send({message:'name is required'});
        }

        //check for existing category
        const existingCategory = await categoryModel.findOne({name});
        if(existingCategory){
            return res.status(200).send({
                success: true,
                message: 'Category already exist'
            });
        }
        const category = await new categoryModel({name, slug:slugify(name)}).save();
        res.status(201).send({
            success:true,
            message:'New category Created',
            category
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in category',
            error
        });
    }
};

//update category controller
export const updateCategoryController = async(req, res) => {
    try {
        const {name} = req.body;
        const {id} = req.params;
        const category = await categoryModel.findByIdAndUpdate(id, {name, slug:slugify(name)}, {new:true});
        res.status(200).send({
            success:true,
            message:'Category Updated',
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"Error while updating category"
        });
    }
};

//get all category
export const categoryController = async(req, res) => {
    try {
        const category = await categoryModel.find({});
        res.status(200).send({
            success:true,
            message:'All category List',
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:'Cant not find All category'
        });
    }
};

//get single category
export const singleCategoryControler = async(req, res) => {
    try {
        const category = await categoryModel.findOne({slug: req.params.slug});
        res.status(200).send({
            success:true,
            message:"Get single category Success",
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in getting single category",
            error
        });
    }
};


//delete category controler
export const deleteCategoryController = async(req, res) => {
    try {
        const {id} = req.params;
        await categoryModel.findByIdAndDelete((id));
        res.status(200).send({
            success:true,
            message:"Category Deleted successfuly",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Deleting category",
            error,
        });
    }
};