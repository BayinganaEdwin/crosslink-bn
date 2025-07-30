require('dotenv').config();

const { DATABASE_URL } = process.env;

if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL is not defined. Check your .env file.');
  process.exit(1);
}

module.exports = {
  development: {
    username: 'postgres',
    password: '1001',
    database: 'crosslink',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  staging: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
