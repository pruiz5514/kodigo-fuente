import { DataTypes } from "sequelize";
import { sequelize } from "../sequelize.js";
import { Category } from "./category.model.js";
export const Product = sequelize.define('product', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    category_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: Category,
            key: 'id'
        }
    },
});
