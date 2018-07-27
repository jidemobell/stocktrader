const cluster = require('cluster');
const program = require('commander');
const {createCompany,getBaseTarget,checkBaseBid,checkBudget} = require('./server/models/logic');
const {makeBidInquiries} = require('./helperfunctions/inquire/inquire');




// if (cluster.isMaster){
//   const processors = require('os').cpus().length;

	
// 	for(var i=0; i < processors; i+=1){
// 		cluster.fork();
// 	}

// 	cluster.on('exit', (worker)=>{
// 		cluster.fork();
// 	})

// }else{
//    console.log(`stocktrader running with worker ${cluster.worker.id}`);
   
   program
     .version('1.0.0')
     .description('an app to buy stocks of various exchange via an API')
   program
     .command('makeBid')
     .alias('m')
     .description('make a bid')
     .action(()=>{
       makeBidInquiries().then(answers => {
        getBaseTarget(answers).then(data =>{
           if(data){
              checkBudget(answers).then(response => {
                console.log('all passed', response)
              }).catch(e => console.log(e.stack))
           }
        }).catch(e => console.log(e.stack))
       })
     })
    
    program.parse(process.argv);

  // app.listen(port, ()=>{
  //   console.log(`Stocktrader running on port ${port} with worker ${cluster.worker.id}`)
  // });
//}
