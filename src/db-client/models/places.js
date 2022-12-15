import { DataTypes } from "sequelize";

const places = async (sequelize) =>{

    sequelize.define('places', {
        // id:{
        //     type: DataTypes.INTEGER,
        //     autoIncrement: true,
        //     primaryKey: true,
        //     defaultValue: sequelize.literal("nextval('places_id_seq'::regclass)")
        // },
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
    },{
        freezeTableName: true,
        timestamps: false
    })

   return await sequelize.sync({alter: true})

}

export default places;