import express from "express";
import fs from 'fs'
import authMiddleware from "../middleware/auth.middleware.js";


const router = express.Router();



export default (modal) => {
    
    router.post('/add-to-favourites', authMiddleware, async (req,res)=>{
        try{
            const { email } = req.decodedTokenData;
            const {id, imagePath, imageAlt, title, description} = req.body;
            const {clientId} = await modal.client.findOne({
                where:{
                    email
                }
            })
            const data = await modal.favourites.create({
                favId: id, imagePath, imageAlt, title, description, clientId
            })
            res.send({
                status: 200,
                message: 'data saved successfully'
            })
        }catch(err)
        {
            console.log(err.message)
            res.send({
                status: 500,
                message: 'something went wrong'
            })
        }

    })

    router.get('/all-favourites', authMiddleware, async(req,res)=>{
        try{

            const {email} = req.decodedTokenData;
            const {clientId} = await modal.client.findOne({
                where:{
                    email
                }
            })

            const data = await modal.favourites.findAll({
                where:{
                    clientId
                }
            })
            
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
                message: 'something went wrong while fetching the all favourites'
            })
        }
    })
    
    router.delete('/remove-from-favourites/:id', authMiddleware, async(req,res)=>{
        const {id} = req.params;
        try{
            const data = await modal.favourites.destroy({
                where:{
                    favId: id
                }
            })

            res.send({
                status:200,
                message: 'successfully deleted ! thanks for deletion',
                data: data
            })

        }catch(err)
        {
            console.log(err.message)
            res.send({
                status: 500,
                message: 'something went wrong while removing the favourites'
            })
        }
    })
    

    return router;
};