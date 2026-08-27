
import { DataTypes } from "sequelize";
import { sequelize } from "../sequelize.js";

export const Category = sequelize.define('category',{
    id:{
        primaryKey:true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull:false
    }
});
