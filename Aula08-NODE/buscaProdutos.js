const http = require("http");

const hostname = "127.0.0.1";

const port = 3000;

var conn = mysql.createConnection({
    host: "localhost", 
    user : "root",
    password : "",
    database : "loja"
});

const server = http.createServer((req, res)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    //res.end("Olá mundo.");
    
conn.connect(function(erro){
    if (!erro) {
        sql = "SELECT * FROM produto";
        conn.query(sql, function(err, result, fields){
            if (!err){
                res.end(result);
            }else {
                res.end(err);
            }
        });
    }
});
});

server.listen(port, hostname, ()=> {
    console.log("Servidor executando em: http://" + hostname + ":" +port+ "/");
});