var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : '',
  user     : '',
  password : '',
  database : ''
});

connection.connect();


 /*
connection.query("select * from users order by level desc limit 5", function (error, results, fields) {
  if (error) throw error;

  console.log('The solution is: ', results);
});
*/
/*
connection.query("delete from users where userId = 20372100003526147", function (error, results, fields) {
    if (error) throw error;
    
      console.log(results);
  });

connection.end();


*/