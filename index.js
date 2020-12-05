const express = require("express");  // v4.17.x as of Apr 2020
const app = express();
const port =5000;

app.use(express.json());

app.post("/echo", (req, res) => {
  res.send({"request":req.body});
}); 


console.log(`Listening Server on port Number ${port}`)

app.listen(port);