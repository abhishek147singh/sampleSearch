import mongoose from "mongoose";

const addSchema = new mongoose.Schema({
    headline:{ type: String, required: true },
    primaryText:{ type: String, required: true },
    CTA:{type : String , required : true},
    description: { type: String, required: true },
    companyId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Companie',
        required: true,
    },
    imageUrl : { type: String, required: true },
} , 
{
    timestamps : true
});

const Addvitisment = mongoose.model('Addvitisment' , addSchema );
export default Addvitisment;