const chai = require('chai');
//const should = chai.should;
const expect = chai.expect;
chai.should();
chai.use(require('chai-things'));
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);




const models = require('../server/models/logic')
const answers = {
  country: 'US',
  category: 'automobile',
  bid: 8
}


describe('db returns an array on any valid inputs', ()=>{
  
  it('should return an array of baseTarget winners', async ()=>{
    const output = await models.getBaseTarget(answers);
    expect(output).to.be.an('array')
  })


  it('should return an array of budgetCheck winners', async ()=>{
    const output = await models.checkBudget(answers);
    expect(output).to.be.an('array')
  })

  it('should return an array of basebid winners', async ()=>{
    const output = await models.checkBaseBid(answers);
    expect(output).to.be.an('array')
  })

  it('should return an array of shortlisted winners', async ()=>{
    const output = await models.shortList(answers);
    expect(output).to.be.an('array')
  })

})


describe('db returns an array with expected property on valid test input', ()=> {
  it('baseTarget check should return an array with a known property', async ()=>{
    const output = await models.getBaseTarget(answers);
    expect(output).to.have.all.keys('company_id')
  })

  it('budget check return an array with a known property', async ()=>{
    const output = await models.checkBudget(answers);
    expect(output).to.have.all.keys('company_id')
  })

  it('basebidcheck return an array with a known property', async ()=>{
    const output = await models.checkBaseBid(answers);
    expect(output).to.have.all.keys('company_id')
  })

  it('shortlisting return an array with a known property', async ()=>{
    const output = await models.shortList(answers);
    expect(output).to.have.all.keys('company_id')
  })
})


describe('db should throw an error on invalid inquirer input', ()=>{
    it('baseTarget check should throw an error on invalid data', async ()=>{
       return  expect(models.getBaseTarget()).to.be.rejectedWith(TypeError)
    })

    it('budgetCheck check should throw an error on invalid data', async ()=>{
      return  expect(models.checkBudget()).to.be.rejectedWith(TypeError)
   })

   it('basebid check should throw an error on invalid data', async ()=>{
    return  expect(models.checkBaseBid()).to.be.rejectedWith(TypeError)
 })

 it('shortList check should throw an error on invalid data', async ()=>{
  return  expect(models.shortList()).to.be.rejectedWith(TypeError)
})
})


