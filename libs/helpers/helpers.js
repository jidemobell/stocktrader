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

const exitLogger = (action) => {
  const now = new Date().toString();
  return new Promise((resolve, reject) => {
    fs.appendFile('server.log',`${now}: program exits at ${action} check` + '\n' ,(err)=>{
       if(err) reject(err)
       process.exit();
    })  
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


const parseWinSuccess = (data) =>{
  const build = [];
  for (let i = 0; i < data.length; i++) {
  const e = data[i];
  const id = e.company_id;
  
  build.push(`${id}`)
  }
return build
}


module.exports = {
  queryHelper,
  logger,
  parseSuccess,
  parseWinSuccess,
  exitLogger
};