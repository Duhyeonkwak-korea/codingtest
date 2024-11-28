const user = require("G://codingtest2//repository//userRepositore.js");
const store = require("G://codingtest2//repository//storesRepostore.js");
const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || 'development';
const config = require("G:\\codingtest2\\databases\\config\\config.json")[env];
const databasesConfig = new Sequelize("codingtest", "root", "1234",config);


module.exports = {uploadProduct, searchItem, buyItem}; 

//판매자는 물품을 올릴수있다. 필요한것: 판매자 이름, 물품, 비용, 갯수
async function uploadProduct(name, product,cost, quantity){
    try {
        var transaction = await new Sequelize.Transaction(databasesConfig);
        let users = await user.findUser(name,transaction);
        let uploadProduct = await store.uploadProduct(name, product, cost, quantity,users[0].dataValues.id,transaction)
        await transaction.commit();
        return uploadProduct        
    } catch (error) {
        console.log(error);
        transaction.rollback();
        
    }
}


// 구매자는 아이템을 조회하고 구매할수있다.

// 아이템 조회 
async function searchItem(){
    try {
        var transaction = await new Sequelize.Transaction(databasesConfig);
        let products = await store.findProductAll();
        await transaction.commit();
        return products;
    } catch (error) {
        console.log(error);
        transaction.rollback()
        throw error;
    }

}

//아이템 구매 > 구매자의 잔고 차감 > 물품 갯수 차감 > 판매자의 잔고 상승 
async function buyItem(sellername, buyname, product ,quantity, cost){
    try{
        console.log(sellername, buyname, product, quantity, cost);
        var transaction = await new Sequelize.Transaction(databasesConfig);
        let consumer = await user.findUser(buyname);
        //잔고 확인
        if(quantity*cost > consumer[0].dataValues.balance){
            return new error("잔고가 부족합니다.");
        }
    
        let products = await store.findProduct(product);
        for(i = 0; i<products.length; i++){
            if(quantity > products[i].dataValues.quantity){
                return new error("수량이 부족합니다.");
            }
        }
        const buyexpenses = await user.subtractBalance(cost*quantity, buyname,transaction);
        const deductedProduct = await store.buyProduct(sellername, product, quantity,transaction);
        const sellProduct = await user.addBalance(quantity * cost, sellername,transaction);

        await transaction.commit();
        return "good";
    } catch(error){
        console.log(error);
        transaction.rollback();
        throw error;
    }
}

