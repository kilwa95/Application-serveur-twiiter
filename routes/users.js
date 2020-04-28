const router = require('express').Router();
const { signup, signupForm ,uploadImage} = require('../controllers/users.controlle');
const { ensureAuthenticated } = require('../config/auth.config');


router.get('/signup/form', signupForm);
router.post('/signup', signup)
router.post('/update/image', ensureAuthenticated, uploadImage);


module.exports = router;
