'use strict';

const { Router } = require('express');
const router = Router();

router.use(require('./shows'));
router.use(require('./directors'));

router.get('/', (req, res) => {
  res.json({
    "shows": "api/v1/shows",
    "directors": "api/v1/directors"
  });
});

module.exports = router;
