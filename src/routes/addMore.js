import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import path from 'path';

const router = express.Router();

export default (modal, upload, dirname) => {
  router.post(
    "/add-places",
    authMiddleware,
    upload.single("file"),
    async (req, res) => {
     try{
      const { email } = req.decodedTokenData;
      const {imageAlt, title, description } = req.body;
      const imagePath = req.file.originalname;//path.join(dirname,'/uploads', req.file.originalname)
      const row = await modal.places.create({
        imageAlt, imagePath, title, description
      })

      res.send({
        status: 200,
        message: 'data saved successfully',
        data: row,
      })

     }catch(err)
     {
        console.log(err.message)
        res.send({
          status: 500,
          message: 'something went wrong !'
        })
     }
      
    }
  );


  router.get("/all-places", async(req, res)=>{
    try{
      const data = await modal.places.findAll({attributes: ['id', 'imageAlt', 'imagePath', 'title', 'description']})
      
      res.send({
        status: 200,
        message: 'data fetched successfully',
        data: data
      })
      
    }catch(err)
    {
      console.log(err.message)
      res.send({
        status: 500,
        message: 'something went wrong !'
      })
    }
  })

  router.delete("/remove-places", authMiddleware, (req, res) => {});

  return router;
};
