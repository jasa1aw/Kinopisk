const express = require('express');
const passport = require('passport');
const router = express.Router();
const {signUp, signIn, logOut} = require('./controller');
const createAdmin= require('../Admin/seed');
const { create } = require('connect-mongo');

router.post('/api/signup', signUp)
router.post('/api/signin', passport.authenticate('local', {failureRedirect: '/login?error=1'}), signIn)
router.get('/api/logout', logOut)
router.get('/api/auth/google', passport.authenticate('google'), (req, res) =>{
    res.redirect('/profile/' + req.user.id)
})
createAdmin()

module.exports = router;