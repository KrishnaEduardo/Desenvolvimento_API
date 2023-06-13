var mysql = require("mysql");

var conn = mysql.createConnection({
    host: "localhost", 
    user : "root",
    password : "",
    database : "loja"
});

conn.connect(function(erro){
    if (!erro) {
        sql = "SELECT * FROM produto";
        conn.query(sql, function(err, result, fields){
            if (!err){
                console.log(result);
            }else {
                console.log(err);
            }
        });
    }
});