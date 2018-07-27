require('dotenv').config();
const {Pool} = require('pg');
//const {getEnvConfig}  = require('./config');
const fs = require('fs');
// const pool = getEnvConfig();


/**
 * create database tables with the sql init script
 * if it does not exist.
 */

const config = {
  user: process.env.PG_USER,
  database: process.env.PG_DBASE,
  password: process.env.PG_KEY,
  host: process.env.PG_HOST||"localhost",
  port: process.env.PG_PORT||5432,
  max: 10,
  idleTimeoutMillis: 30000,
}

const pool = new Pool(config);

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(0);
});


//function getSql(){ 
  fs.readFile('server/db/init.sql', 'utf-8', (err, data) => {
  if (err) {
    console.error('error reading sql file', err);
    process.exit();
  }
  (async function(){
    try {
      const client = await pool.connect();
      await client.query(data)
      client.release()
    } catch (error) {
      console.error('DATABASE ERROR: ', error.stack)
        process.exit();
    }
  })()
  
 // return data
});


// const data = getSql();
// console.log('DATA oUTSIDE', data)

// (async function(){
//   try {
//     const client = await pool.connect();
//     await client.query(getSql())
//     client.release()
//   } catch (error) {
//     console.error('DATABASE ERROR: ', error.stack)
//       process.exit();
//   }
// })()


module.exports = {
  pool
};