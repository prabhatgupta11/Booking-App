import express , {Request,Response}from "express";
import cors from "cors";
import "dotenv/config";
import  mongoose from "mongoose";
import userRouter from "./routes/users";
import loginRouter from "./routes/auth";
import cookieParser from "cookie-parser";
import path from "path";
const run = async () => {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STING as string,)
    console.log("Connected to myDB");
  }
  
  run()
  .catch((err) => console.error(err))


const app=express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors(
  {
    origin:process.env.FRONTEND_URL,
    credentials:true,
  }
));

app.use(express.static(path.join(__dirname,"../../frontend/dist")));


app.use("/api/users",userRouter)


app.listen(4500,()=>{
    console.log(`Server is running at 4500`)
})