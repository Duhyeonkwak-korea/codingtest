const express = require("express");
const cors = require("cors");
const app = express();
const userService = require("G://codingtest2//service//userservice.js");
const userRepositore = require("G://codingtest2//repository//userRepositore.js");


app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json()); 
app.listen(3000);

//회원가입
app.post("/member", function(req,res){
    try {
        let user = req.body;
        let createmember = userService.register(user.name, user.balance);
        res.status(200).send({data:createmember});
    } catch (error) {
        console.log(error);
        res.status(400).send("잘못된 요청입니다.")
    }

})


//전체 회원 조회
app.get("/allmember", async function(req,res){
    try {
        let allmember = await userRepositore.findAll();
        res.status(200).send({data:allmember});
    } catch (error) {
        console.log(error);
        res.status(400).send("잘못된 요청입니다.");
    }

})

