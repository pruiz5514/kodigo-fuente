require('dotenv').config({ path: require('path').resolve(__dirname, '..', '..', '.env') });

const options = {
  url: process.env.DATABASE_URL,
  dialect: 'postgres',
};

module.exports = {
  development: options,
  test: options,
  production: options,
};
