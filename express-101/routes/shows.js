'use strict';

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/mediaStore.sqlite');

const { Router } = require('express');
const router = Router();

const getShows = (req, res, next) => {
  db.all(`SELECT * FROM shows`, (err, shows) => {
    if (err) return next(err);
    res.status(200).json(shows);
  });
};

router.get('/shows', getShows);

module.exports = router;
