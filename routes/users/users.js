var express = require('express');
var passport = require('passport');
var router = express.Router();

var userController = require('./controller/userController');

const validateRegisterInput = require('../utils/validation/register'); 

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Export register func
router.post('/createuser', function(req, res, next) {

  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  } else {
    userController.register(req.body)
    .then(user => res.json(user))
    .catch(err => res.json(err));
  }
})

// Export login func
router.post('/loginuser', function(req, res, next) {
  userController.login(req.body)
    .then(user => res.json(user))
    .catch(err => res.json(err))
})

// Use passport for authentication
router.get('/checkauth', passport.authenticate('jwt', {session: false}), function(req, res, next) {

  res.json({
    payload:req.user
  })

})

module.exports = router;
