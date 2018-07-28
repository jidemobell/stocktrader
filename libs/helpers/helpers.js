const {pool} = require('../../server/db/db');
const fs = require('fs');

const queryHelper = (query) => {
  return new Promise((resolve, reject) => {
    return pool.query(query)
      .then(res => resolve(res.rows))
      .catch(e => reject(e))
  })
}

const logger = (log,header)=>{
  let now = new Date().toString();
  let input = `${now}:${header}:${log}`
  fs.appendFile('server.log',input + '\n', (err)=>{
    if(err) console.error
  })
}



module.exports = {
  queryHelper,
  logger
};