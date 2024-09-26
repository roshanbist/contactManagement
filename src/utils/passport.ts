import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import dotenv from 'dotenv';

import { UserDocument } from '../model/UserModel';
import userService from '../services/userService';
import { NotFound } from './CustomError';

dotenv.config({ path: '.env' });

const JWT_SECRET = process.env.JWT_SECRET as string;

const opts = {
  secretOrKey: JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

// Passport JWT strategy
export const jwtStrategy: JwtStrategy = new JwtStrategy(
  opts,
  async (payload, done: any) => {
    try {
      const userEmail = payload.user.email as string;

      const user: UserDocument | null = await userService.getUserByEmail(
        userEmail
      );

      if (user) {
        return done(null, user);
      }

      throw new NotFound('User not found');
    } catch (error) {
      done(error, false);
    }
  }
);
