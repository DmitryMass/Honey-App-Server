import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';
dotenv.config();

const { DATABASE_URL } = process.env;
const sequelize = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

export default sequelize;

// const sequelize = new Sequelize('honey-server', 'postgres', 'postgres', {
//   dialect: 'postgres',
//   host: 'localhost',
//   port: 5432,
// });

// export default sequelize;
