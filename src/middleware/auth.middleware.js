import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) =>{

    const webtoken = req.headers.authorization ? req.headers.authorization.split(" ")[1] : "";
    const { TokenExpiredError } = jwt;
    try {
        const decoded = jwt.verify(webtoken, process.env.JWT_SECRET || '')
        req.decodedTokenData = decoded;
        next()
    }catch(err)
    {
       if(err instanceof TokenExpiredError)
       {
            res.send({
                status: 408,
                message: 'Session expired ! login again'
            })
       }else
       {
        res.send({
            status: 401,
            message: 'authorization failed'
        })
       }
        
    }

}

export default authMiddleware