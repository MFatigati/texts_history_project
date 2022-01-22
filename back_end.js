const express = require("express");
const path = require('path');
const DBQUERY = require('./lib/dbQuery')

const app = express();
const host = "localhost";
const port = 3001;

SQL = "SELECT * FROM texts";

app.use(express.static(path.join(__dirname, 'public')));

app.get("/test", (req, res) => {
  res.sendFile('/views/test.html', {root: __dirname})
});

app.get("/database", (req, res, next) => {
  console.log('test');
  DBQUERY.connectToDB()
    .then((data) => { return DBQUERY.getResult(SQL, data)})
    .then((data) => { return DBQUERY.disconnectFromDB(data)})
    .then((data) => {
      console.log(data.result.rows);
      res.json(data.result.rows);
      return data;
    })
    .catch(err => console.log(err))
})

app.get("/texts", (req, res, next) => {
  console.log('getting texts');
  DBQUERY.connectToDB()
    .then((data) => { return DBQUERY.getResult(SQL, data)})
    .then((data) => { return DBQUERY.disconnectFromDB(data)})
    .then((data) => {
      console.log(data.result.rows);
      res.json(data.result.rows);
      return data;
    })
    .catch(err => console.log(err))
})

app.listen(port, host, () => {
  console.log(`Texts project is listening on port ${port} of ${host}!`);
});