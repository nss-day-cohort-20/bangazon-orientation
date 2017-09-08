const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/mediaStore.sqlite');

module.exports = {
  getAll: () => {
    return new Promise( (resolve, reject) => {
      db.all(`SELECT * FROM directors`, (err, direx) => {
        if (err) return reject(err);
        resolve(direx);
      });
    });
  }
}
