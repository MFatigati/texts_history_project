const { Client } = require("pg");

const DBQUERY = {
  connectToDB() {
    return new Promise((resolve, reject) => {
      let data = {};
      data.client = new Client({ database: "texts_project" });
      data.client.connect(err => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      });
    })
  },
  
  getResult(SQL, data) {
    return new Promise((resolve, reject) => {
      data.client.query(SQL, (err, res) => {
        if (err) {
          reject(err);
        } else {
          data.result = res;
          resolve(data);
        }
      })
    })
  },
  
  disconnectFromDB(data) {
    return new Promise((resolve, reject) => {
      data.client.end();
      resolve(data);
    })
  }
}

module.exports = DBQUERY;