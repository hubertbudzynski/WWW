const { promisify } = require("util");
const run = (db) => promisify(db.run.bind(db));
const get = (db) => promisify(db.get.bind(db));
const all = (db) => promisify(db.all.bind(db));

async function initUsers(db) {
    await run(db)("BEGIN TRANSACTION;");
    await run(db)("CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, login TEXT)");
    await run(db)("INSERT INTO user (login) VALUES ('admin')");
    id = await get(db)("SELECT last_insert_rowid() as id");

    // dodatkowy login.
    await run(db)("INSERT INTO user (login) VALUES ('mimuw')");

    await run(db)("COMMIT TRANSACTION;");
    return id;
}

async function loginUser(db, login) {
    await run(db)("BEGIN TRANSACTION;");
    var user = await get(db)("SELECT * FROM user WHERE login = '" + login + "'");
    await run(db)("COMMIT TRANSACTION;");

    return user;
}

module.exports = { initUsers, loginUser }