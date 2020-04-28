const express = require('express');
const router = express.Router()
const tweets = require('./tweets');
const users = require('./users');
const auth = require('./auth');
const {ensureAuthenticated} = require('../config/auth.config');


router.use('/tweets', ensureAuthenticated, tweets);
router.use('/users',users);
router.use('/auth',auth);

router.get('/', (req,res) => {
  res.redirect('/tweets')
})
module.exports = router