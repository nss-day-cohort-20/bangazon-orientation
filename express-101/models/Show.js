const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/mediaStore.sqlite');

module.exports = {
  getAll: () => {
    return new Promise( (resolve, reject) => {
      db.all(`SELECT * FROM shows`, (err, showsData) => {
        if(err) return reject(err);
        resolve(showsData); 
      });
    });
  },
  getOne: (id) => {
    return new Promise( (resolve, reject) => {
      db.get(`SELECT shows.*, directors.name AS director
              FROM shows
              JOIN directors ON director_id = directors.dir_id
              WHERE show_id = ${id}`, (err, show) => {
                if (err) return reject(err);
                resolve(show);
              });
    });
  }
}
