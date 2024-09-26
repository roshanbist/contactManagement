import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import passport from 'passport';

import { UserDocument } from '../model/UserModel';
import { JwtToken } from '../types/all';

export const HashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (
  plainPassword: string,
  hashPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(plainPassword, hashPassword);
};

export const generateTokens = async (user: UserDocument): Promise<JwtToken> => {
  const JWT_SECRET = process.env.JWT_SECRET as string;

  const accessToken = jwt.sign(
    {
      user: {
        id: user._id,
        email: user.email,
      },
    },
    JWT_SECRET,
    {
      expiresIn: '20m',
    }
  );

  return { accessToken };
};

export const passportAuthenticate = (method = 'jwt') =>
  passport.authenticate(method, { session: false });

export default {
  HashPassword,
  comparePassword,
  generateTokens,
  passportAuthenticate,
};
