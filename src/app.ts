import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import passport from 'passport';

import { errorHandlerMiddleware } from './middleware/errorHandlerMiddleware';
import { InvalidRouteController } from './controllers/InvalidRouteController';
import contactsRoutes from './routes/contactsRoutes';
import userRoutes from './routes/userRoutes';
import { jwtStrategy } from './utils/passport';

dotenv.config({ path: '.env' });

const app = express();

app.use(express());
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
passport.use(jwtStrategy);

app.use('/api/v1/contacts', contactsRoutes);
app.use('/api/v1/users', userRoutes);

app.all('*', InvalidRouteController);

app.use(errorHandlerMiddleware);

export default app;
