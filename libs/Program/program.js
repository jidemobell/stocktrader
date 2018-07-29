const program = require('commander');
const {trade} = require('../inquire/inquire');
const {control} = require('./contol')


const init = ()=>{
  program
  .version('1.0.0')
  .description('an app to buy stocks of various exchange via an API')
program
  .command('trade')
  .alias('t')
  .description('make a bid')
  .action(()=>{
   trade().then(answers => {
       control(answers);
    }).catch(e => console.log(e.stack)) 
  })
 
 program.parse(process.argv);

}

module.exports = {init}