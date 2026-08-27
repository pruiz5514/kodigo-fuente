
import { DataTypes } from "sequelize";
import { sequelize } from "../sequelize.js";

export const DiscountType = sequelize.define('discount_type',{
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
