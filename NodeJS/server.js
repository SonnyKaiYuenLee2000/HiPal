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

app.get('/', (req, res) => {
  res.send('Hello Moto')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
