const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const { validate, schemas, REQ_PARAMTERS } = require('../middlewares/validator');
router.post('/user', validate(schemas.user, REQ_PARAMTERS.BODY), authController.createUser);
router.post('/login', validate(schemas.user, REQ_PARAMTERS.BODY), authController.login);
router.get('/validate', validate(schemas.validate, REQ_PARAMTERS.QUERY), authController.validateToken);
module.exports = router;
