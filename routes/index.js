var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', linkedInKey:process.env.LINKEDIN_KEY });
});

module.exports = router;
