import { QueryInterface } from 'sequelize';

const now = new Date();

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert('products', [
      // Lácteos (1)
      { id: 1, name: 'Leche entera 1L', price: 4200, category_id: 1, createdAt: now, updatedAt: now },
      { id: 2, name: 'Yogurt natural 200g', price: 2800, category_id: 1, createdAt: now, updatedAt: now },
      { id: 3, name: 'Queso campesino 250g', price: 9500, category_id: 1, createdAt: now, updatedAt: now },
      { id: 4, name: 'Kumis 1L', price: 6300, category_id: 1, createdAt: now, updatedAt: now },

      // Panadería (2)
      { id: 5, name: 'Pandebono x6', price: 5500, category_id: 2, createdAt: now, updatedAt: now },
      { id: 6, name: 'Almojábana x4', price: 4800, category_id: 2, createdAt: now, updatedAt: now },
      { id: 7, name: 'Pan', price: 6900, category_id: 2, createdAt: now, updatedAt: now },
      { id: 8, name: 'Pan tajado blanco', price: 5900, category_id: 2, createdAt: now, updatedAt: now },

      // Carnes y embutidos (3)
      { id: 9, name: 'Chorizo x4', price: 8900, category_id: 3, createdAt: now, updatedAt: now },
      { id: 10, name: 'Carne de res molida 500g', price: 14500, category_id: 3, createdAt: now, updatedAt: now },
      { id: 11, name: 'Pollo entero', price: 17900, category_id: 3, createdAt: now, updatedAt: now },
      { id: 12, name: 'Jamón 250g', price: 8300, category_id: 3, createdAt: now, updatedAt: now },

      // Frutas y verduras (4)
      { id: 13, name: 'Aguacate (unidad)', price: 2500, category_id: 4, createdAt: now, updatedAt: now },
      { id: 14, name: 'Papa criolla 500g', price: 3200, category_id: 4, createdAt: now, updatedAt: now },
      { id: 15, name: 'Plátano hartón verde (unidad)', price: 1500, category_id: 4, createdAt: now, updatedAt: now },
      { id: 16, name: 'Mango (unidad)', price: 1800, category_id: 4, createdAt: now, updatedAt: now },
      { id: 17, name: 'Lulo 500g', price: 3600, category_id: 4, createdAt: now, updatedAt: now },

      // Congelados (5)
      { id: 18, name: 'Arepas de maíz congeladas x10', price: 7200, category_id: 5, createdAt: now, updatedAt: now },
      { id: 19, name: 'Papa a la francesa congelada 750g', price: 11900, category_id: 5, createdAt: now, updatedAt: now },
      { id: 20, name: 'Mix de verduras congeladas 500g', price: 6700, category_id: 5, createdAt: now, updatedAt: now },

      // Bebidas (6)
      { id: 21, name: 'Gaseosa 1.5L', price: 5200, category_id: 6, createdAt: now, updatedAt: now },
      { id: 22, name: 'Jugo de mango 1L', price: 4500, category_id: 6, createdAt: now, updatedAt: now },
      { id: 23, name: 'Café molido 500g', price: 12800, category_id: 6, createdAt: now, updatedAt: now },
      { id: 24, name: 'Cerveza x6 330ml', price: 19900, category_id: 6, createdAt: now, updatedAt: now },
      { id: 25, name: 'Agua embotellada 600ml', price: 2100, category_id: 6, createdAt: now, updatedAt: now },

      // Aseo y limpieza (7)
      { id: 26, name: 'Jabón en barra multiusos 300g', price: 3400, category_id: 7, createdAt: now, updatedAt: now },
      { id: 27, name: 'Detergente en polvo 1kg', price: 9800, category_id: 7, createdAt: now, updatedAt: now },
      { id: 28, name: 'Limpiador multiusos líquido 1L', price: 7300, category_id: 7, createdAt: now, updatedAt: now },

      // Cuidado personal (8)
      { id: 29, name: 'Jabón 125g', price: 2900, category_id: 8, createdAt: now, updatedAt: now },
      { id: 30, name: 'Shampoo 550ml', price: 13500, category_id: 8, createdAt: now, updatedAt: now },
      { id: 31, name: 'Crema dental 90ml', price: 4900, category_id: 8, createdAt: now, updatedAt: now },
      { id: 32, name: 'Desodorante 150ml', price: 11200, category_id: 8, createdAt: now, updatedAt: now },
    ], {});
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('products', {});
  }
};
