const cluster = require('cluster');
const program = require('commander');
const {createCompany,getBaseTarget,checkBaseBid,checkBudget,shortList} = require('./server/models/logic');
const {trade} = require('./libs/inquire/inquire');
const {logger}= require('./libs/helpers/helpers')


function parseSuccess(data){ 
  const build = [];
  for (let i = 0; i < data.length; i++) {
  const e = data[i];
  const id = e.company_id;
  
  build.push(`{${id},'Passed'}`)
  //logger(`{ ${id},'Passed' }`)
  }
return build
}


// if (cluster.isMaster){
//   const processors = require('os').cpus().length;

	
// 	for(let i=0; i < processors; i+=1){
// 		cluster.fork();
// 	}

// 	// cluster.on('exit', (worker)=>{
// 	// 	cluster.fork();
// 	// })

// }else{
//    console.log(`stocktrader running with worker ${cluster.worker.id}`);
   
   program
     .version('1.0.0')
     .description('an app to buy stocks of various exchange via an API')
   program
     .command('trade')
     .alias('t')
     .description('make a bid')
     .action(()=>{
       trade().then(answers => {
        getBaseTarget(answers).then(data =>{
          console.log('passed base targets', data)
         const log = parseSuccess(data)
          logger(log,'BaseTargeting');
          checkBudget(answers).then(data =>{
            const log = parseSuccess(data)
             logger(log,'BudgetCheck');
             checkBaseBid(answers).then(data =>{
              const log = parseSuccess(data)
               logger(log,'BaseBid');
               shortList(answers).then(data =>{
                const log = parseSuccess(data)
                 logger(log,'Winner');
              })
            })
          })
       }).catch(e => console.log(e.stack));
       }).catch(e => console.log(e.stack))   
     })
    
    program.parse(process.argv);
//}
