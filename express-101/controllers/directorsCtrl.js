'use strict';

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/mediaStore.sqlite');

module.exports.getDirectors = (req, res, next) => {
  db.all(`SELECT * FROM directors`, (err, direx) => {
    if (err) return next(err);
    res.status(200).json(direx);
  });
};

module.exports.getOneDirector = ({params: {id}}, res, next) => {
  // req.params.id
  db.get(`SELECT * FROM directors WHERE dir_id = ${id}`, (err, direx) => {
    if (err) return next(err);
    res.status(200).json(direx);
  });
};
