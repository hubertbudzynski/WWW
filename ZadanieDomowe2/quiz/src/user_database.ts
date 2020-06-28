import * as sqlite3 from 'sqlite3';
/* tslint:disable-next-line:no-var-requires */
global.crypto = require('crypto')
/* tslint:disable-next-line:no-var-requires */
const { promisify } = require("util");
import sha256 from 'crypto-js/sha256';

const run = (db: sqlite3.Database) => promisify(db.run.bind(db));
const get = (db : sqlite3.Database) => promisify(db.get.bind(db));

async function initUserDB() {
  sqlite3.verbose();

  const db: sqlite3.Database = new sqlite3.Database('baza.db');
  await run(db)("BEGIN TRANSACTION;");
  await run(db)("DROP TABLE IF EXISTS users");

  await run(db)('CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, username VARCHAR(255), password VARCHAR(255), last_pass_id VARCHAR(255));');
  let pass = sha256("user1").toString();
  let pass_id = sha256(Math.random().toString()).toString();  

  await run(db)('INSERT INTO users (username, password, last_pass_id) VALUES (?, ?, ?)', ["user1", pass, pass_id]);
  pass = sha256("user2").toString();
  pass_id = sha256(Math.random().toString()).toString(); 

  await run(db)('INSERT INTO users (username, password, last_pass_id) VALUES (?, ?, ?)', ["user2", pass, pass_id]);
  await run(db)("COMMIT TRANSACTION;");
  db.close();
}

async function logUser(username: string, password: string, db : sqlite3.Database) {
  sqlite3.verbose();
  const pass = sha256(password).toString();
  const user = await get(db)("SELECT id, username, last_pass_id FROM users WHERE username = ? AND password = ?", [username, pass]);
  return user;
}

async function changePassword(userId: number, password: string, db: sqlite3.Database) {
  const pass = sha256(password).toString();
  let pass_id = sha256(Math.random().toString()).toString();

  await run(db)('UPDATE users  SET password = ?, last_pass_id = ?  WHERE id = ?;', [pass, pass_id, userId]);
}

async function getLastPassId(userId: number, db: sqlite3.Database) {
  const pass_id = await get(db)("SELECT last_pass_id FROM users WHERE id = ?", [userId]);

  return pass_id.last_pass_id;
}
module.exports = { initUserDB, logUser, changePassword, getLastPassId };