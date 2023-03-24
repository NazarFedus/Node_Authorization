const Router = require('express');
const router = new Router();
const controller = require('./authController')
const {check} = require('express-validator');

router.post('/registration', [
     check('username', "Username can't be empty").notEmpty(),
     check('password', "Password must be longer than 4 and shorter than 10").isLength({min: 4, max: 10})
], controller.registration);
router.post('/login', controller.login);

router.get('/users', controller.getUsers);

module.exports = router;