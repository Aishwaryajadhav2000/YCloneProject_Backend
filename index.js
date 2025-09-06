import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import connectDatabase from './database/database.js';
import {runAllSeeders} from "./seeder/masterSeeder.js"

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 8000;
app.listen(PORT,()=>{
    console.log(`server connected to port : ${PORT}`)
});

// mongoose.connect('mongodb+srv://aishwaryaj1608_db_user:c5LO2prcJAFTOFsZ@yt.lfypvmp.mongodb.net/').then(()=>{
//     console.log("DB connected...")
// }).catch((err)=>{
//     console.log(err , "error while connecting...")
// });

// app.get('/' , (req,res)=>{
//     res.send("Welcome to root route")
// })

connectDatabase().then(async ()=>{
    await runAllSeeders();
    app.listen(PORT , ()=> console.log(`Server running on port : ${PORT}`))
})




