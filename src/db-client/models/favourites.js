import { DataTypes } from "sequelize";

const favourites = async (sequelize) =>{

    sequelize.define('favourites', {
        favId:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        imageAlt:{
            type: DataTypes.STRING,
            allowNull: false
        },
        imagePath:{
            type: DataTypes.STRING,
            allowNull: false
        },
        title:{
            type: DataTypes.STRING,
            allowNull: false
        },
        description:{
            type: DataTypes.STRING,
            allowNull: false
        },
        clientId:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },{
        freezeTableName: true,
        timestamps: false
    })

   return await sequelize.sync({alter: true})

}

export default favourites;