'use strict';

const { Router } = require('express');
const router = Router();

const { getShows } = require('../controllers/showCtrl');

router.get('/shows', getShows);

module.exports = router;
