import express from 'express';
import passport from 'passport';
const router = express.Router();

//need to explicity log this user out 
router.get('/logout',  function(req,res){
	
	//var User = require('../models/user')(req.config.mongo.URL);
	
	//if (req.user){
	//	User.findOne({ username: req.user.username}).remove().exec();
	//}
	
	req.logout();
	
	req.session.destroy(function(err){
		res.redirect("/");
	});
});
  
router.get('/github', passport.authenticate('github', { scope: 'public_repo' }));

router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/auth/github' }), function(req, res) {
    console.log("callback success");
    res.redirect('/');
});

module.exports = router;

