const {queryHelper} = require('../../helperfunctions/query/pgQueryHelper');

/**
 * action_1 : base targeting,
 * action_2 : budget check,
 * action_3 : base bid checks,
 * action_4 : shortlist
 * action_5 : update budget => budget minus bid
 * data from commander
 * 
 */

module.exports = {
 createCompany : async function (data){    //create with a base bid for test
                 try {
                  const result = await queryHelper(`INSERT INTO stock_details (company_id,country,budget,bid,category)
                  VALUES ('${data.companyId}','${data.country}','${data.budget}',
                  ${data.bid},'${data.category}';)`)
                 //  .then(response => console.log('company creates on stockage'))
                 //  .catch(e => console.log(e.stack))
                  return result;
                 } catch (error) {
                  return error.stack
                 }
     

  },


  getBaseTarget: async function(data){
                 try {
                  const result = await queryHelper(`SELECT EXISTS (SELECT 1 FROM stock_details WHERE 
                    company_id='${data.countryId}' AND category='${data.category}')`)
                    // .then(response => response)
                    // .catch(e => console.log(e.stack))
                  return result;
                   
                 } catch (error) {
                   //return error.stack
                   throw error
                 }
    
  },

  checkBudget: async function(data){
    try {
      const result = await  queryHelper(`select * from stock_details where budget is not null;`)
      // .then(response => response)
      // .catch(e => console.log(e.stack))
      return result
    } catch (error) {
      throw error
    }
   
  },

  checkBaseBid: async function(bid){
  try {
    const result = await  queryHelper(`SELECT * FROM stock_details WHERE bid < ${bid} ;`)
      // .then(response => response) //shortlist the highest bid
      // .catch(e => console.log(e.stack))
      return result
  } catch (error) {
    throw error
  }
   
  },

  updateCompanyBudget: async function(data){
    try {
        //calculate new budget from code then update
    const result = await queryHelper(`UPDATE stock_details SET budget=${data.newBudget} WHERE company_id=${data.companyId};`)
    // .then(response => response)
    // .catch(e => console.log(e.stack))
    return result;
    } catch (error) {
      return error.stack
    }
    
  }
  

}