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

const parseSuccess = (data)=>{ 
  const build = [];
  for (let i = 0; i < data.length; i++) {
  const e = data[i];
  const id = e.company_id;
  
  build.push(`{${id},'Passed'}`)
  }
return build
}



module.exports = {
  queryHelper,
  logger,
  parseSuccess
};