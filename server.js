import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import addvitismentRouter from "./routes/addvitismentRoutes.js";

const app = express();
dotenv.config();

mongoose.connect(process.env.MONGOODB_URL).then(() => {
    console.log("connected to DB");
}).catch(err => {
    console.log("Error :", err.message);
});

app.use(express.json());
app.use(express.urlencoded({extended : true }));

app.use('/api/addvitisment', addvitismentRouter);

app.use((err , req , res , next) => {
    res.status(500).send({message : err.message }); 
})

app.use(express.static("public"));

app.listen(process.env.PORT || 5000 , () => {
    console.log("server is running at http://localhost:5000");
})