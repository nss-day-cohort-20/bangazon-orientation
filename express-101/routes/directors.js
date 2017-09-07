'use strict';

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/mediaStore.sqlite');

const { Router } = require('express');
const router = Router();

const getDirectors = (req, res, next) => {
  db.all(`SELECT * FROM directors`, (err, direx) => {
    if (err) return next(err);
    res.status(200).json(direx);
  });
};

router.get('/directors', getDirectors);

module.exports = router;
