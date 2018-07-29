require('dotenv').config();
const {Pool} = require('pg');
const path = require('path')
const fs = require('fs');


/**
 * create database tables with the sql init script
 * if it does not exist.
 */

const config = {
  // user: '****',
  // database: '****',
  // password: '****',
  // host: "localhost",
  // port: '***',
  // max: 10,
  // idleTimeoutMillis: 30000,

  //you may enter details inside a .env
    // user: process.env.PG_USER,
    // database: process.env.PG_DBASE,
    // password: process.env.PG_KEY,
    // host: process.env.PG_HOST||"localhost",
    // port: process.env.PG_PORT||5432,
    // idleTimeoutMillis: 30000,
}

const pool = new Pool(config);

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(0);
});


  fs.readFile(path.join(__dirname,'init.sql'), 'utf-8', (err, data) => {
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

});

module.exports = {
  pool
};