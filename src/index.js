import { config } from 'dotenv';
import express from 'express';
import cors from 'cors';
import dbo from './db-client/dbo.js';
import router from './routes/index.js'
import models from './db-client/models/index.js';
import  multer  from 'multer';
import path from 'path'
import { fileURLToPath } from "url";
config();

const app = express();
// const _path = fileURLToPath(import.meta.url)
// export const dirname = path.dirname(_path)


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './src/uploads');
    },
    filename: function (req, file, cb) {
        console.log(file);
        cb(null , file.originalname );
    }
});

const upload = multer({ storage: storage })



app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static('./src/uploads'));


const dboClient = new dbo();

const clientModal = new models.client(dboClient.sequelize)

try{
    await dboClient.sequelize.authenticate();
    await clientModal.createTable();
    await models.favourites(dboClient.sequelize)
    await models.places(dboClient.sequelize)
    app.use('/authenticate', router.auth(dboClient.sequelize.models))
    app.use('/favourites',router.favourites(dboClient.sequelize.models, upload))
    app.use('/places', router.addMore(dboClient.sequelize.models, upload));
}catch(err){
    console.log('error while creating database ' + err);
}



app.listen(process.env.PORT, () =>{
    console.log('server started on port ' + process.env.PORT )
    
})