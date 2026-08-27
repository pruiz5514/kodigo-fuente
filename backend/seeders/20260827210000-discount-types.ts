import { QueryInterface } from 'sequelize';

const now = new Date();

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert('discount_types', [
      { id: 1, name: 'Porcentaje', createdAt: now, updatedAt: now },
      { id: 2, name: 'Monto fijo', createdAt: now, updatedAt: now },
    ], {});
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('discount_types', {});
  }
};
