var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/mediaStore.sqlite');

module.exports.getShows = (req, res, next) => {
  db.all(`SELECT * FROM shows`, (err, shows) => {
    if (err) return next(err);
    res.status(200).json(shows);
  });
};
