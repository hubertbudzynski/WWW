import * as sqlite3 from 'sqlite3';
/* tslint:disable-next-line:no-var-requires */
const quizDatabase = require('./quiz_database')
/* tslint:disable-next-line:no-var-requires */
const userDatabase = require('./user_database')
/* tslint:disable-next-line:no-var-requires */
const { promisify } = require("util");

const run = (db : sqlite3.Database) => promisify(db.run.bind(db));
const get = (db: sqlite3.Database) => promisify(db.get.bind(db));

async function initDB() {

    sqlite3.verbose();

    userDatabase.initUserDB().then(() => {
        quizDatabase.initQuizDB();
    })
    

}


module.exports = { initDB };

