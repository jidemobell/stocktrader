require('dotenv').config();
const env = process.env.NODE_ENV;
const {Pool} = require('pg');


/**
 * dotenv gets necessary variable names
 * 
 */
// const config = {
//   "test": {
//     user: process.env.PG_USER,
//     database: `ADCASH_TEST_EXCHANGE`,
//     password: process.env.PG_KEY,
//     host: process.env.PG_HOST||"localhost",
//     port: process.env.PG_PORT||5432,
//     idleTimeoutMillis: 30000,
//   },
//   "development": {
//     user: process.env.PG_USER,
//     database: process.env.PG_DBASE,
//     password: process.env.PG_KEY,
//     host: process.env.PG_HOST||"localhost",
//     port: process.env.PG_PORT||5432,
//     max: 10,
//     idleTimeoutMillis: 30000,
//   },
// }

const config = {
    user: process.env.PG_USER,
    database: process.env.PG_DBASE,
    password: process.env.PG_KEY,
    host: process.env.PG_HOST||"localhost",
    port: process.env.PG_PORT||5432,
    max: 10,
    idleTimeoutMillis: 30000,
}


const getEnvConfig = () => {
  if (!config[env].user){
      console.error(new Error
        ('check that postgres user is set').message);
      process.exit();
    }

  switch (env) {
    case 'test':
      process.env.PORT = 3000;
      return new Pool(config.test);
    case 'development':
      process.env.PORT = 3000;
      return new Pool(config.development);
    case 'production':
      return new Pool(config.production);

  }
}


module.exports = {getEnvConfig}