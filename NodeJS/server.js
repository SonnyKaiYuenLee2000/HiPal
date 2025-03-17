//const { createServer } = require('node:http');
//const hostname = '127.0.0.1';
const port = 3000;
// const server = createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });
// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });
const express = require('express')
var cors = require('cors')

const app = express()
app.use(cors())


var mysql = require('mysql2');

var con = mysql.createConnection({
host: "localhost",
user: "root",
password: "hipal123",
database: "HiPal"});

var sql = "select * from tblPoints;"
//var sql = "show databases;";
var locationTest;

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    locationTest = result;
  });
});


app.get('/', (req, res) => {
 // res.send('Hello Moto')
 res.send(locationTest);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
