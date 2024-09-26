import express from 'express';

import {
  registerUser,
  loginUser,
  currentUser,
} from '../controllers/userController';
import { passportAuthenticate } from '../utils/AuthUtil';

const routes = express.Router();

routes.post('/register', registerUser);
routes.post('/login', loginUser);
routes.get('/current', passportAuthenticate(), currentUser);

export default routes;
