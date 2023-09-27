const express = require('express');
const passport = require('passport');
const router = express.Router();
const {signUp, signIn, logOut} = require('./controller');

router.post('/api/signup', signUp)
router.post('/api/signin', passport.authenticate('local', {failureRedirect: '/login?error=1'}), signIn)
router.get('/api/logout', logOut)

module.exports = router;