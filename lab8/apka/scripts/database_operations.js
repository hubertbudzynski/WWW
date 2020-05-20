var sqlite3 = require('sqlite3');
var express = require('express');

function createDB() {
    sqlite3.verbose();
    let db = new sqlite3.Database('baza.db');
    db.run('CREATE TABLE IF NOT EXISTS wyswietlenia (sciezka VARCHAR(255), liczba INT);');
    db.close();
}

function getData() {
    sqlite3.verbose();
    let db = new sqlite3.Database('baza.db');
    var data = {"data" : []}
    db.run('CREATE TABLE IF NOT EXISTS wyswietlenia (sciezka VARCHAR(255), liczba INT);', () => {
        db.all('SELECT sciezka, liczba FROM wyswietlenia;', [], (err, rows) => {
            if (err) throw(err);
    
            for(let {sciezka, liczba} of rows) {
                data.data.push({sciezka, liczba});
                // console.log(sciezka, '->', liczba);
            }
            db.close();
        });
    });
    
    
    return data;
}


function addData(fileName) {
    sqlite3.verbose();
    let db = new sqlite3.Database('baza.db');
    console.log("JESTEM!");
    db.get('SELECT liczba FROM wyswietlenia WHERE sciezka = ?;', [fileName], (err, row) => {
        if (err) {
            return console.error(err.message);
        }

        if (!row) {
            db.run('INSERT INTO wyswietlenia (sciezka, liczba) VALUES (? , 1);', [fileName]);
        }
        else {
            db.run('UPDATE wyswietlenia SET liczba = liczba + 1 WHERE sciezka = ? ;', fileName); 
        }
    });
    

    db.close();
}

module.exports = {createDB : createDB, getData : getData, addData : addData};