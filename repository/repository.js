//데이터 베이스와의 연결역할(쿼리문등 들어갈 예정)
const mysql = require('mysql');

//데이터베이스 모듈화
const database = require("G:\\codingtest\\database.js")


var connection = mysql.createConnection({
    host     : '',
    user     : '',
    password : '',
    database : ''
});

connection.connect();


module.exports = {searchTop100, searchMore100, finduser, deleteuser}


//랭킹조회 상위 100위까지 조회 쿼리문
    function searchTop100(){
        let searchTop100qurey = "select * from users order by level desc, exp desc limit 100";
        return query(searchTop100qurey);
    }
    


    // 랭킹조회 상위 100이상의 조회 페이징 처리 퀴리문
    function searchMore100(page, pageable){
        let searchMore100query = "select * from users order by level desc, exp desc limit ?, ?";
        let offset = ((page - 2) * pageable) + 101; // page, (page-1 * pageable) + start, (page-1 * pageable) + start + 페이지 단위
        return valuesquery(searchMore100query,[offset, pageable])
    }
    


// 랭킹 키워드 검색 
    function finduser(nickname){
        let finduserquery = "select * from users where nickname = ?";
        return valuesquery(finduserquery, nickname);
    }


// 사용자 삭제 퀴리문 
   
    function deleteuser(nickname){
        let deleteuserquery = "delete from users where nickname = ?";
        valuesquery(deleteuserquery, nickname);
        return 1;
    }
/*
    function deleteuser(userid){
        userid = parseInt(userid);
        connection.query("delete from users where userId = ?",userid , function (error, results, fields) {
          if (error) throw error;
          
            console.log(results);
        });

      }
        */
    //쿼리결과 가져오기
    function query(sql) {
        return new Promise((resolve, reject) => {
          connection.query(sql, (error, results) => {
            if (error) {
              reject(error);
            } else {
              resolve(results);
            }
          });
        });
      }

      //다양한 매개변수 쿼리
      function valuesquery(sql, values) {
        return new Promise((resolve, reject) => {
          connection.query(sql, values, (error, results) => {
        
            if (error) {
              reject(error);
            } else {
              resolve(results);
            }
          });
        });
      }