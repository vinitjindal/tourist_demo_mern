import {Sequelize} from 'sequelize';


class dbo {
    
    static sequelize;

    constructor(){
        this.sequelize = new Sequelize(  
            process.env.RDS_DB_NAME || 'touristDB', // db name
            process.env.RDS_DB_USER || 'postgres', // db user
            process.env.RDS_DB_PASSWORD || 'ttn123', // db password
            {
                host: process.env.RDS_DB || 'localhost',
                port: 5432,
                dialect: 'postgres'
            },)
    }
}


export default dbo;