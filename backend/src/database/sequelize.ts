import { Sequelize } from 'sequelize';
import 'dotenv/config';

const { DATABASE_URL } = process.env;

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL no está definida en el archivo .env');
}

export const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  timezone: '+00:00',
  dialectOptions: {
    useUTC: true,
  },
});