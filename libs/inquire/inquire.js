const inquirer = require('inquirer');
const validator = require('validator');


module.exports = {
  trade(){
    const questions = [
     { name: 'country',
       type: 'input',
       message: 'Enter a Country code:',
       validate: value => {
         if(!value.length){
           return 'You need a country code to make a bid!'
         }else if(!validator.isAlpha(value) || !validator.isLength(value,{min:0,max:2})){
           return `Country code should be of format 'CH', 'US'`
         }
         return true;
       }
    },
    {
      name: 'category',
      type: 'input',
      message: 'Enter a stock category:',
      validate: value =>{
        if(!value.length){
          return 'Please indicate a category'
        }else if(!validator.isAlpha(value)){
          return 'enter only alphanumeric values for category'
        }
        return true;
      }
    },
    {
      name:'bid',
      type:'input',
      message: 'Enter a bid value:',
      validate: value =>{
        if(!value.length){
          return 'Please indicate a bid value'
        }else if(!validator.isInt(value,{allow_leading_zeroes: false})){
          return 'enter only numbers to make a bid'
        }
        return true;
      }
    }
    ];

    return inquirer.prompt(questions);
  }
}