import express, { Request, Response } from "express"
import multer from "multer"
import cloudinary from  "cloudinary";
import Hotel, { Hoteltype } from "../models/hotel";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 //5 mb
    }
})

router.post("/",
verifyToken,[
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Hotel is required"),
    body("pricePerNight").notEmpty()
    .isNumeric()
    .withMessage("Price epr night  is required and must be a number"),
    body("facilities").notEmpty()
    .isArray()
    .withMessage("Facilities is required"),

]
, upload.array("imageFiles", 6), async (req: Request, res: Response) => {

    try {
        const imageFiles = req.files as Express.Multer.File[];
        const newHotel:Hoteltype = req.body;

        //1. upload the image to cloudinary

        const uploadPromises=imageFiles.map(async(image)=>{
            const b64=Buffer.from(image.buffer).toString("base64")
            let dataURL="data:"+image.mimetype + ";base64,"+b64;
            const res=await cloudinary.v2.uploader.upload(dataURL);
            return res.url;
        });
    
        const imageurls=await Promise.all(uploadPromises);
        newHotel.imageUrls=imageurls;
        newHotel.lastUpdated=new Date();
        newHotel.userId=req.userId;

        // 3. save the new hotel in our database;
       const hotel =new Hotel (newHotel)
       await hotel.save();

       res.status(201).send(hotel); 
    } catch (err) {
    console.log("Error creating hotel:",err);
    res.status(500).json({message:"Something went wrong while uploading the image"})
    }
})

export default router;