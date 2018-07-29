const {queryHelper} = require('../../libs/helpers/helpers');

/**
 *
 */

module.exports = {
  createCompany: async function (data) { 
    try {
      const result = await queryHelper(
        `INSERT INTO stock_details (company_id,country,budget,bid,category)
         VALUES ('${data.companyId}','${data.country}','${data.budget}',
         ${data.bid},'${data.category}';)`)
      return result;
    } catch (error) {
      return error
    }
  },


  getBaseTarget: async function (data) {
    try {
      const result = await queryHelper(
        `SELECT company_id FROM stock_details 
         WHERE '${data.country}'= any(country) AND '${data.category}' = any(category)`)
      return result;
    } catch (error) {
      throw error
    }

  },

  checkBudget: async function (data) {
    try {
      const result = await queryHelper(
        `WITH temp_table AS (SELECT * FROM stock_details 
         WHERE '${data.country}'= ANY(country) AND '${data.category}' = 
         ANY(category)) SELECT company_id FROM temp_table WHERE budget IS NOT NULL`)
      return result
    } catch (error) {
      throw error
    }

  },

  checkBaseBid: async function (data) {
    const bid = parseInt(data.bid) / 100;
    try {
      const result = await queryHelper(`
    WITH bid_table AS (WITH temp_table AS (SELECT * FROM stock_details 
      WHERE '${data.country}'= ANY(country) AND '${data.category}' = 
      ANY(category)) SELECT * FROM temp_table WHERE budget IS NOT NULL)
    SELECT company_id FROM bid_table WHERE bid < ${bid}`)
      return result
    } catch (error) {
      throw error
    }

  },

  shortList: async function (data) {
    const bid = parseInt(data.bid) / 100;
    try {
      //calculate new budget from code then update
      const result = await queryHelper(
        `WITH final_table AS (WITH bid_table AS (WITH temp_table AS (SELECT * FROM stock_details 
          WHERE '${data.country}'= ANY(country) AND '${data.category}' = 
          ANY(category)) SELECT * FROM temp_table WHERE budget IS NOT NULL)
        SELECT * FROM bid_table WHERE bid < ${bid}) 
        SELECT company_id FROM final_table WHERE bid = (SELECT MAX(bid) FROM final_table) 
        `)
      return result;
    } catch (error) {
      return error
    }

  },

  updateCompany: async function(winner,data){
    const bid = parseInt(data.bid) / 100;
    try {
       const result = await queryHelper(
        `UPDATE stock_details SET budget = budget-${bid}
      WHERE company_id ='${winner}'`
      )
      return true;
    } catch (error) {
      return error
    }
  }


}