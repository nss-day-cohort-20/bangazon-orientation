'use strict';
'use strict';

const { getAll } = require('../models/Director');

module.exports.getDirectors = (req, res, next) => {
  getAll()
  .then( (direx) => {
    res.status(200).json(direx);
  })
  .catch( (err) => next(err));
};

module.exports.getOneDirector = ({params: {id}}, res, next) => {
  // req.params.id
  db.get(`SELECT * FROM directors WHERE dir_id = ${id}`, (err, direx) => {
    if (err) return next(err);
    res.status(200).json(direx);
  });
};
