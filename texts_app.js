const express = require("express");

const app = express();
const host = "localhost";
const port = 3000;

app.listen(port, host, () => {
  console.log(`Texts project is listening on port ${port} of ${host}!`);
});