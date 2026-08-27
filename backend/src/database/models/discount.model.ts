
import { DataTypes } from "sequelize";
import { sequelize } from "../sequelize.js";
import { Category } from "./category.model.js";
import { Product } from "./product.model.js";
import { DiscountType } from "./discount-type.model.js";

export const Discount = sequelize.define('discount',{
    id:{
        primaryKey:true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull:false
    },

    category_id:{
        allowNull: true,
        type:DataTypes.INTEGER,
        references: {
            model: Category,
            key:'id'
        }
    },

    product_id:{
        allowNull: true,
        type:DataTypes.INTEGER,
        references: {
            model: Product,
            key:'id'
        }
    },

    discount_type_id: {
        allowNull: false,
        type:DataTypes.INTEGER,
        references: {
            model: DiscountType,
            key:'id'
        }
    },

    discount_value:{
        allowNull: false,
        type: DataTypes.DECIMAL(10, 2)
    },

    start_date:{
        allowNull: false,
        type: DataTypes.DATEONLY
    },

    end_date:{
        allowNull: false,
        type: DataTypes.DATEONLY
    },

    status: {
        type: DataTypes.ENUM('Programado', 'Activo', 'Finalizado'),
        allowNull: false,
        defaultValue: 'Programado'
    }
},{
    validate: {
        productXorCategory() {
            const hasCategory = this.category_id != null;
            const hasProduct = this.product_id != null;

            if (hasCategory === hasProduct) {
                throw new Error('La promoción debe estar asociada a un producto o a una categoría, pero no a ambos ni a ninguno.');
            }
        }
    }
});
