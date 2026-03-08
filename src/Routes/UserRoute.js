import express from 'express';
import {
  LoginController,
  SignUpController,
} from '../Controller/UserController.js';
import {
  loginValidation,
  userValidation
} from '../Validation/UserValidation.js';
import { validate } from '../Middleware/validate.js';

const router = express.Router();

router.post('/user/signup', validate(userValidation), SignUpController);

router.post('/user/login', validate(loginValidation), LoginController);

export default router;
