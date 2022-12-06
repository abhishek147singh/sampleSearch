import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    name: { type: String, required: true},
    url : { type: String, required: true },
} , 
{
    timestamps : true
});

const Company = mongoose.model('Companie' , companySchema );
export default Company;