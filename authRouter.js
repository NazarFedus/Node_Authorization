const Router = require('express');
const router = new Router();
const controller = require('./authController')
const {check} = require('express-validator');
const authMiddleware = require('./middleware/authMiddleware');
const roleMiddleware = require('./middleware/roleMiddleware');

router.post('/registration', [
     check('username', "Username can't be empty").notEmpty(),
     check('password', "Password must be longer than 4 and shorter than 10").isLength({min: 4, max: 10})
], controller.registration);
router.post('/login', controller.login);

router.get('/users', roleMiddleware(['USER']), controller.getUsers);

module.exports = router;