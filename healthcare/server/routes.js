const express = require('express');
const router = express.Router();
const patients = require('./services/patients');

router.get('/', function(req, res, next) {
  try {
    res.json(patients.getMultiple(req.query.page));
  } catch(err) {
    console.error(`Error while getting patients `, err.message);
    next(err);
  }
});

router.post('/', function(req, res, next) {
    try {
      res.json(patients.create(req.body));
    } catch(err) {
      console.error(`Error while adding patients `, err.message);
      next(err);
    }
});

module.exports = router;