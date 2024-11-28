const express = require("express");
const cors = require("cors");
const app = express();
const storeService = require("G://codingtest2//service//onlineexchange.js");



app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json()); 
app.listen(3000);



//전체 물품 조회
app.get("/allproduct", async function(req,res){
    try {
        let allproduct = await storeService.searchItem();
        res.status(200).send({data:allproduct});
    } catch (error) {
        console.log(error);
        res.status(400).send("잘못된 요청입니다.");
    }

})



// 물품 구매
app.post("/purchase", function(req,res){
    try {
        let user = req.body;
        console.log(user);
        let buyItem = storeService.buyItem(user.sellername, user.buyname, user.productname, user.quantity, user.cost);
        res.status(200).send({data:buyItem});
    } catch (error) {
        console.log(error);
        res.status(400).send("잘못된 요청입니다.");
    }

})

//업로드
app.post("/saleproduct", async function(req,res){
    try {
        let user = req.body;
        console.log(user);
        let update = await storeService.uploadProduct(user.sellername, user.productname, user.cost, user.quantity);
        console.log(update);
        res.status(200).send({data:update});
    } catch (error) {
        console.log(error);
        res.status(400).send("잘못된 요청입니다.");
    }
    
})