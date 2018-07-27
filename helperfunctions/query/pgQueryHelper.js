const {pool} = require('../../server/db/db');
const fs = require('fs');

const queryHelper = (query) => {
  return new Promise((resolve, reject) => {
    return pool.query(query)
      .then(res => resolve(res.rows))
      .catch(e => reject(e))
  })
}

// const queryHelper = (async(query) => {
//   const data = await pool.query(query)
//   return data.rows
// })().catch


const queryUnique = (query) => {
  return queryHelper(query)
    .then(rows => {
      if (rows.length === 0) {
        return Promise.reject(new Error('not found'));
      }
      return rows[0];
    })
    .catch(e => e.message);
}

const logger = (log)=>{
  let now = new Date().toString();
  let input = `${now}: ${log}`
  fs.appendFile('server.log',input + '\n', (err)=>{
    if(err) console.error
  })
}



module.exports = {
  queryHelper,
  queryUnique,
  logger
};