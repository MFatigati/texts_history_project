/**
 * create select lists for each bit of data
 * populate select lists from database
 * configure select lists to respond to one another
 * enable ability to add to select lists
 */

import DBQUERY from '../../lib/dbQuery.js'


document.addEventListener('DOMContentLoaded', () => {
    let textsSelect = document.getElementById('texts-list');

    function populateSelectList(list, data) {
        
    }

    let getAllTexts = new XMLHttpRequest();
    getAllTexts.open('GET', '/texts');
    getAllTexts.addEventListener('load', () => {
        
    })

    DBQUERY.connectToDB()
    .then((data) => { return DBQUERY.getResult(SQL, data)})
    .then((data) => { return DBQUERY.disconnectFromDB(data)})
    .then((data) => {
      console.log(data.result.rows);
      res.json(data.result.rows);
      return data;
    })
    .catch(err => console.log(err))
    getAllTexts.send();

})