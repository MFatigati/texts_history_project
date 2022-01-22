/**
 * create select lists for each bit of data
 * populate select lists from database
 * configure select lists to respond to one another
 * enable ability to add to select lists
 */


document.addEventListener('DOMContentLoaded', () => {
    let textsSelect = document.getElementById('texts-list');

    function populateSelectList(list, data) {
        
    }

    let getAllTexts = new XMLHttpRequest();
    getAllTexts.open('GET', '/texts');
    getAllTexts.addEventListener('load', () => {
        
    })
    getAllTexts.send();
})