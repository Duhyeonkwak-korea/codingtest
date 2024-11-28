const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || 'development';
const config = require("G:\\codingtest2\\databases\\config\\config.json")[env];
const sequelize = new Sequelize("codingtest", "root", "1234",config);
const table = require("G:\\codingtest2\\databases\\models\\tables.js");


module.exports = {findProductAll, findProduct, uploadProduct, buyProduct, deleteProduct};

//전체 물품 조회하기
async function findProductAll(){
  return  await table.Stores.findAll()
}

//원하는 물품 조회하기
function findProduct(product, transaction){
  return table.Stores.findAll({
    where:{
      productname: product     
    }
  },{Transaction: transaction});
}

// 물품 업로드(insert) 필요한 것: 유저 닉네임, 물품 이름, 비용, 갯수
function uploadProduct(user, product,cost, quantity, userid ,transaction){
  return table.Stores.create({
    sellername: user,
    productname: product,
    cost: cost,
    quantity: quantity,
    UserId: userid
  },{Transaction: transaction});
}


// 물품 차감(update) 물품 얼마나 차감할지
async function buyProduct(user, product, number, transaction){
  let products =await findProduct(product, transaction);
  var quantitys = products[0].dataValues.quantity;

  if(quantitys < number){
    return new error("수량부족");
  }

  var quantitys = quantitys - number;
  return await table.Stores.update(
    {quantity: quantitys},
    {
      where: {
      sellername : user,
      productname : product
    }
  }, {Transaction: transaction, lock: transaction.LOCK.UPDATE})
}


// 물품 삭제(delete)

function deleteProduct(user, product, transaction){
  return table.Stores.destroy({
    where:{
      sellername: user,
      productname: product
    }
  }, {Transaction: transaction})
}
