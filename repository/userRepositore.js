const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || 'development';
const config = require("G:\\codingtest2\\databases\\config\\config.json")[env];
const sequelize = new Sequelize("codingtest", "root", "1234",config);
const table = require("G:\\codingtest2\\databases\\models\\tables.js");

sequelize.sync({force: false})
    .then(()=>{
        console.log("DB Connected Success");
    })
    .catch((err)=> {
        console.error(err);
    });


module.exports = {createUser, findUser, findAll,addBalance, subtractBalance};

async function createUser(name, balance, transaction){
  return table.User.create({
    name: name,
    balance: balance
  },{Transaction: transaction});
}

//사용자 정보 조회
async function findUser(name, transaction){
  return await table.User.findAll({
          where:{
            name: name
          }     
      },{Transaction: transaction});
}

function findAll(){
  return table.User.findAll();
}

//판매시 판매자의 잔고 비용 상승
async function addBalance(profit, name, transaction){
  let user = await findUser(name, transaction);

  let balances = await user[0].dataValues.balance;
  balances = await balances + profit;
  return await table.User.update(
    {balance : balances},
    {where: {
      name: name,
    }
},{Transaction: transaction})
}

//구매시 구매자 잔고 비용 하락
async function subtractBalance(expenses, name, transaction){
    let user = await findUser(name, transaction);


    balances = await user[0].dataValues.balance;

    if (expenses > balances){
       return new Error("잔고부족");
    }

    balances = await balances - expenses;   
    return await table.User.update(
      {balance : balances},
      {
      where : {
        name: name
      }
    }, {Transaction: transaction});
}
