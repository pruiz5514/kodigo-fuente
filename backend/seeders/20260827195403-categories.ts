import { QueryInterface } from 'sequelize';

const now = new Date();

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert('categories', [
      { id: 1, name: 'Lácteos', createdAt: now, updatedAt: now },
      { id: 2, name: 'Panadería', createdAt: now, updatedAt: now },
      { id: 3, name: 'Carnes y embutidos', createdAt: now, updatedAt: now },
      { id: 4, name: 'Frutas y verduras', createdAt: now, updatedAt: now },
      { id: 5, name: 'Congelados', createdAt: now, updatedAt: now },
      { id: 6, name: 'Bebidas', createdAt: now, updatedAt: now },
      { id: 7, name: 'Aseo y limpieza', createdAt: now, updatedAt: now },
      { id: 8, name: 'Cuidado personal', createdAt: now, updatedAt: now },
    ], {});
  },


  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('categories', {});
  }
};