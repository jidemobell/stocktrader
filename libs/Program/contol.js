const chalk   = require('chalk');
const {getBaseTarget,checkBaseBid,checkBudget,shortList} = require('../../server/models/logic');
const {logger,exitLogger,parseSuccess,parseWinSuccess}= require('../helpers/helpers');




const control = (answers)=>{
  getBaseTarget(answers).then(data =>{
    if(data.length === 0){
      console.log(chalk.blue('base target check not passed, Program will exit!'))
      exitLogger('BaseTarget')
    }else{
      const log = parseSuccess(data)
      logger(log,'BaseTargeting');
      checkBudget(answers).then(data =>{
        if(data.length === 0){
         console.log(chalk.blue('budget check not passed'))
         exitLogger('BudgetCheck')
        }else{
          const log = parseSuccess(data)
          logger(log,'BudgetCheck');
          checkBaseBid(answers).then(data =>{
             if(data.length === 0){
               console.log(chalk.blue('bid check not passed'))
               exitLogger('BaseBid')
             }else{
               const log = parseSuccess(data)
               logger(log,'BaseBid');
               shortList(answers).then(data =>{
                 if(data.length === 0){
                   console.log(chalk.blue('No Winner'))
                 }else{
                   const log = parseWinSuccess(data)
                   logger(log,'Winner'); 
                   console.log(chalk.blue( `Winner is company ${log[0]}`))
                 }
               })
             } 
         })   
        }
      })   
    }  
 }).catch(e => console.log(e.stack));  //db
}


module.exports = {control}