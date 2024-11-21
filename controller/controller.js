//사용자의 응답으로 오류처리등 들어갈 예정
const express = require("express");
const cors = require("cors")
const service = require("G:\\codingtest\\service\\service.js")
const repositiory = require("G:\\codingtest\\repository\\repository.js")
const app = express();
app.use(cors());

app.listen(3000);


//Top 100랭킹 조회 (get)
app.get("/top100-rank", async function(req,res){
    try {
        let top100Rank = await service.checkRanking(1,0);
        res.status(200).send({data:top100Rank})
    } catch (error) {
        console.log(error);
        res.status(400).send("잘못된 요청입니다.")
    }

})

//Top100 이상 랭킹 조회
app.get("/more100-rank/:page", async function(req, res){
    try {
        let pagination = req.query;
        let more100Rank = await service.checkRanking(pagination.page, pagination.pagesize);
        res.status(200).send({data:more100Rank});
    } catch (error) {
        console.log(error);
        res.status(400).send("잘못된 요청입니다.");
    }
})

//사용자 검색 페이지 (get)
app.get("/user/:id", async function(req,res){
    try {
        let nickname = req.query;
        let user = await repositiory.finduser(nickname.id);
        res.status(200).send(user);
    } catch (error) {
        console.log(error);
        res.status(400).send("잘못된 요청입니다.")
    }

})

//사용자 데이터 삭제 (delete)
app.delete("/user/:nickname",async function(req,res){
    try {
        let user = req.params;
        let deleteuser = await repositiory.deleteuser(user.nickname);
        res.status(200).send({data:deleteuser});
    } catch (error) {
        console.log(error);
        res.status(400).send("잘못된 요청입니다.")
    }

})

