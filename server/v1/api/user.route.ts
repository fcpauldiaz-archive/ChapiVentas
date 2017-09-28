import express  = require('express');
import validate = require('express-validation');
import expressJwt = require('express-jwt');
import userController from '../application/user.controller';

const router = express.Router(); // eslint-disable-line new-cap

/**
 * GET /api/carrera
 */
router.route('/')
  .get(userController.list)
  .post(userController.create);

router.route('/:username')
  .get(userController.get);

router.route('/auth')
  .post(userController.authenticate);

export default router;
