const express = require('express');
const router = express.Router();
const {tweetList,tweetNew,tweetCreate,tweetDelete,tweetEdit,tweetUpdate} = require('../controllers/tweet.controller');



router.get('/' , tweetList);
router.get('/new' , tweetNew);
router.get('/edit/:tweetId', tweetEdit);
router.post('/' , tweetCreate);
router.post('/update/:tweetId', tweetUpdate);
router.delete('/:tweetId', tweetDelete);
               

module.exports = router;


