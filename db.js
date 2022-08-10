const sqlite = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const DB_PATH = path.join(__dirname, './users.db');
const DB_SQL_PATH = path.join(__dirname, './mydb.sql');

class PromiseDb {
  constructor(path) {
    this._db = new sqlite.Database(path);
  }

  run(query) {
    return new Promise((resolve, reject) => {
      this._db.run(query, function (err, args) {
        if (err) {
          reject(err);
        }
        resolve({ args, statement: this });
      });
    });
  }

  get(query) {
    return new Promise((resolve, reject) => {
      this._db.get(query, function (err, row) {
        if (err) {
          reject(err);
        }
        resolve({ row, statement: this });
      });
    });
  }

  exec(query) {
    return new Promise((resolve, reject) => {
      this._db.exec(query, function (err, row) {
        if (err) reject(err);
        resolve({ row, statement: this });
      });
    });
  }

  all(query) {
    return new Promise((resolve, reject) => {
      this._db.all(query, function (err, rows) {
        if (err) reject(err);
        resolve({ rows, statement: this });
      });
    });
  }
}
const db = new PromiseDb(DB_PATH);
const initSQL = fs.readFileSync(DB_SQL_PATH, 'utf-8');
db.exec(initSQL);

module.exports = db;
