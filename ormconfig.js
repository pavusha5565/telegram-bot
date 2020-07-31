const dotenv = require('dotenv');
dotenv.config();

const baseDir = process.env.TYPEORM_BASE_DIR || 'src';

module.exports = {
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: +process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,

  entities: [`${baseDir}/database/entities/**/*.entity{.ts,.js}`],
  migrationsTableName: 'typeorm_migrations',
  migrations: [`${baseDir}/_migrations/default/*{.ts,.js}`],
  cli: {
    migrationsDir: `${baseDir}/_migrations/default`,
  },
};
