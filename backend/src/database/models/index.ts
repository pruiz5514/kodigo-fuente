import { Category } from "./category.model.js";
import { Product } from "./product.model.js";

Category.hasMany(Product, {foreignKey: "category_id"})
Product.belongsTo(Category, {foreignKey: "category_id"})