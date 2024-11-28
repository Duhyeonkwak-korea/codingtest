const user = require("G://codingtest2//repository//userRepositore.js");
const store = require("G://codingtest2//repository//storesRepostore.js");
const sequelize = require("sequelize");


const env = process.env.NODE_ENV || 'development';
const config = require("G:\\codingtest2\\databases\\config\\config.json")[env];
const databasesConfig = new sequelize("codingtest", "root", "1234",config);

module.exports = {register};

//회원 정보 
async function verifyUser(name, transaction) {
    let users =  await user.findUser(name, transaction);
    return users;
  }


async function register(name, balance){
  try {
    var transaction =  await new sequelize.Transaction(databasesConfig);
    let verifyUser2 = await verifyUser(name,transaction);

    if(verifyUser2[0] != undefined){
      return new Error("사용자가 있습니다.")
    }
    const member = await user.createUser(name, balance, transaction);

    transaction.commit();
    return member;
  } catch (error) {
    console.log(error);
    transaction.rollback();
    throw error;
  }
}

