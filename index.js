import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import connectDatabase from './database/database.js';
import {runAllSeeders} from "./seeder/masterSeeder.js"
import { userRoutes } from "./routes/users.route.js";
import videoRoutes from "./routes/video.routes.js";
import searchRoute from "./routes/search.route.js"
import { channelRoute } from "./routes/channel.routes.js";


const app = express();
const allowedOrigins = [
   "http://localhost:4200",
   "http://localhost:5173",
   "https://you-tube-clone-black-pi.vercel.app"
];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(express.json());

const PORT = 8000;
app.listen(PORT,()=>{
    console.log(`server connected to port : ${PORT}`)
});

app.get('/' , (req,res)=>{
    res.send("Welcome to root route 6")
})

connectDatabase().then(async ()=>{
    await runAllSeeders();
    app.listen(PORT , ()=> console.log(`Server running on port : ${PORT}`))
})


//Routing
//users Routing
userRoutes(app)
//Channels routing
channelRoute(app)
// app.use('/uploads/videos', express.static(path.join(process.cwd(), 'uploads/videos')));
//Videos routing
app.use('/api', videoRoutes);
app.use("/uploads", express.static("uploads"));
//Searching videos routing
app.use("/api/search" , searchRoute)

