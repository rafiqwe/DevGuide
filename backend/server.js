// server.js
const http = require("http");
const app = require("./app");
const connectToDb = require("./config/db");

const port = process.env.PORT || 5000;
const server = http.createServer(app);

connectToDb();
server.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
