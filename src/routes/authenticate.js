import express from "express";
import jwt from 'jsonwebtoken';


const router = express.Router();



export default (modal) => {
    
    router.post('/login', async (req, res)=>{
        const {email, password} = req.body;
        const data = await modal.client.findOne({
            where:{
                email: email,
            }
        })
        const role = data.role
        if(!!data)
        {
            const payload = {
                email,
                tokenFor: role
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '25m'})
            const data = {
                status: 201,
                data: token,
                role: role
            }
            res.send(data)

        }else{
            const data = {
                status: 401,
                data: 'Not authorized'
            }
            res.send(data)
        }
            
    })
    
    return router;
};