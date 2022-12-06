import express  from "express";
import expressAsyncHandler from "express-async-handler";
import mongoose from "mongoose";
import Addvitisment from "../models/addvitismentModel.js";

const addvitismentRouter = express.Router();

addvitismentRouter.post("/", expressAsyncHandler(async (req, res) => {
    try{
        const newProduct = new Addvitisment({
            _id:mongoose.Types.ObjectId(req.body.id),
            headline:req.body.headline,
            primaryText:req.body.primaryText,
            CTA:req.body.CTA,
            description: req.body.description,
            companyId : mongoose.Types.ObjectId(req.body.companyId),
            imageUrl :req.body.imageUrl
        });
        
        const product = await newProduct.save();
        res.send(product);
    }catch(err){
        console.log(err);
    }
}));

addvitismentRouter.get("/search", expressAsyncHandler(async (req, res) => {
    try{
       
        const { query } = req;
        const key = query.key === undefined ? '' : query.key;
        
        const result = await Addvitisment.aggregate([
            { 
                $lookup : {
                    from : "companies",
                    localField : "companyId",
                    foreignField : "_id",
                    as : "Company"
                }
             },
            { $unwind : "$Company"},
            { 
                $project : {
                    companyName : "$Company.name",
                    url:"$Company.url",
                    headline:1,
                    primaryText:1,
                    CTA:1,
                    description:1,
                    imageUrl:1,
                    _id:0
                }
            },
            {
                $match : {
                    $or: [
                        { companyName : {$regex : key }},
                        { primaryText : {$regex : key }},
                        { headline    : {$regex : key }},
                        { description : {$regex : key }}
                    ]
                }
            }
        ]);
        
        res.send(result);
    }catch(err){
        console.log(err);
    }
}));



addvitismentRouter.get("/", expressAsyncHandler(async (req, res) => {
    try{
        const product = await Addvitisment.find({});
        res.send(product);
    }catch(err){
        console.log(err);
    }
}));

export default addvitismentRouter;