const express  = require('express'),
	  router   = express.Router(),
	  passport = require('passport'),
	  User     = require('../models/user')
	  require('../config/passport')
	  
// AUTH CHECK
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.redirect('/login');
}

// LOGIN 
router.get('/login', async (req, res) => {
	let findUser = await User.findOne()
	if(!findUser)
		return res.redirect('/auth/signup')

	res.render('login', { message: req.flash('loginMessage') });
});

// POST LOGIN
router.post('/login', passport.authenticate('local-login', {
	successRedirect : '/admin',
	failureRedirect : '/auth/login',
	failureFlash : true
}));

//SIGNUP 
router.get('/signup', async (req, res) => {
	let findUser = await User.findOne()
	if(findUser)
		return res.redirect('/auth/login')
		
	res.render('signup', { message: req.flash('signupMessage') });
});

// POST SIGNUP
router.post('/signup', passport.authenticate('local-signup', {
	successRedirect : '/admin',
	failureRedirect : '/auth/signup',
	failureFlash : true
}));
//LOGOUT
router.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/auth/login');
});
module.exports = router
