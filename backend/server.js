const http = require('http');
const app = require('./app');
const port = process.env.API_PORT || 5000;

const server = http.createServer(app);

//server.listen(port);
server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
  console.log(`API link at http://localhost:${port}/api-docs/`)
});