const { getAll, getOne } = require('../models/Show');

module.exports.getShows = (req, res, next) => {
  getAll()
  .then( (shows) => {
    res.status(200).json(shows);
  })
  .catch( (err) => {
    next(err);
  });
};

module.exports.getOneShow = ({params: {id}}, res, next) => {
  getOne(id)
  .then( (show) => {
    res.status(200).json(show);
  })
  .catch( (err) => next(err));
}
