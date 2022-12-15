import {DataTypes } from "sequelize";


class client{

    static sequelize;
    constructor(sequelize)
    {
        this.sequelize = sequelize;
    }

    async createTable(){
        this.sequelize.define('client', {
            firstName:{
                type: DataTypes.STRING,
                allowNull: false
            },
            lastName:{
                type: DataTypes.STRING,
                allowNull: false
            },
            email:{
                type: DataTypes.STRING,
                allowNull: false
            },
            password:{
                type: DataTypes.STRING,
                allowNull: false
            },
            clientId:{
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            role:{
                type: DataTypes.STRING,
                allowNull: false
            }
        },{
            freezeTableName: true,
            timestamps: false
        })

       return await this.sequelize.sync({alter: true})
    }

}

export default client;